import { defineConfig, loadEnv } from 'vite'
import type { ViteDevServer, Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

function devContactApiPlugin(resendApiKey?: string): Plugin {
  return {
    name: 'dev-contact-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/contact', async (req: IncomingMessage, res: ServerResponse) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: Buffer | string) => { body += chunk.toString() })
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}')
              const { name, email, subject, message } = parsed

              if (!name || !email || !message) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Name, email, and message are required.' }))
                return
              }

              const apiKey = resendApiKey || process.env.RESEND_API_KEY
              if (!apiKey) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'RESEND_API_KEY is not configured in .env' }))
                return
              }

              const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  from: 'Generation Aid Contact Form <onboarding@resend.dev>',
                  to: ['info@generationaid.org'],
                  reply_to: email,
                  subject: `[Website Inquiry] ${subject || `New message from ${name}`}`,
                  html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
                        <h2 style="color: #1e293b; margin: 0 0 4px 0; font-size: 20px;">New Message from Website</h2>
                        <p style="color: #64748b; margin: 0; font-size: 13px;">Received via Generation Aid Contact Form</p>
                      </div>
                      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                        <tr>
                          <td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Sender:</strong></td>
                          <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                          <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #64748b;"><strong>Subject:</strong></td>
                          <td style="padding: 8px 0; color: #0f172a;">${subject || 'General Inquiry'}</td>
                        </tr>
                      </table>
                      <div style="margin-top: 16px; padding: 18px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 6px;">
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</p>
                      </div>
                      <div style="border-top: 1px solid #e2e8f0; margin-top: 28px; padding-top: 14px; font-size: 12px; color: #94a3b8; text-align: center;">
                        Hit <strong>Reply</strong> to directly email ${name} (${email}).
                      </div>
                    </div>
                  `,
                }),
              })

              const data = await response.json()
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = response.ok ? 200 : response.status
              res.end(JSON.stringify(data))
            } catch (err: unknown) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              const errorMessage = err instanceof Error ? err.message : 'Internal server error'
              res.end(JSON.stringify({ error: errorMessage }))
            }
          })
        } else {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname, '.'), '')
  // Also populate process.env for any server modules or handlers
  Object.assign(process.env, env)

  return {
    plugins: [react(), tailwindcss(), devContactApiPlugin(env.RESEND_API_KEY)],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      port: 5173,
    },
  }
})
