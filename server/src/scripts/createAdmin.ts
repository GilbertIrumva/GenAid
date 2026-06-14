/**
 * One-shot bootstrap script to create (or promote) an approved admin user.
 *
 * Usage:
 *   npm run create-admin -- --name "Gilbert" --email me@example.com --password "supersecret"
 *
 * If a user with that email already exists, the script will:
 *   - update name/password if --update is passed
 *   - always promote them to role=admin and approved=true
 *
 * Designed for the first admin (chicken-and-egg) or password recovery.
 */
import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env";
import { User } from "../models/User";

interface Args {
  name?: string;
  email?: string;
  password?: string;
  update: boolean;
}

function parseArgs(): Args {
  const args: Args = { update: false };
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--update") {
      args.update = true;
      continue;
    }
    const next = argv[i + 1];
    if (a === "--name" && next) {
      args.name = next;
      i++;
    } else if (a === "--email" && next) {
      args.email = next.toLowerCase();
      i++;
    } else if (a === "--password" && next) {
      args.password = next;
      i++;
    }
  }
  return args;
}

async function main() {
  const { name, email, password, update } = parseArgs();

  if (!email) {
    console.error(
      'Usage: npm run create-admin -- --email you@example.com [--name "Your Name"] [--password "min 8 chars"] [--update]\n' +
        "  - New user:           --name + --email + --password required\n" +
        "  - Promote existing:   only --email required (adds role=admin, approved=true)\n" +
        "  - Reset existing:     --email + --password + --update"
    );
    process.exit(1);
  }
  if (password !== undefined && password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  await mongoose.connect(env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  const existing = await User.findOne({ email });

  if (existing) {
    existing.role = "admin";
    existing.approved = true;
    if (update) {
      if (name) existing.name = name;
      if (password) existing.password = password; // re-hashed by pre-save hook
    }
    await existing.save();
    console.log(
      update
        ? `Updated existing user ${email}: role=admin, approved=true${
            password ? ", password reset" : ""
          }${name ? `, name="${name}"` : ""}.`
        : `Promoted existing user ${email} to role=admin, approved=true. ` +
            `(Pass --update with --password to also reset credentials.)`
    );
  } else {
    if (!name || !password) {
      console.error("Creating a new user requires --name AND --password.");
      process.exit(1);
    }
    await User.create({
      name,
      email,
      password,
      role: "admin",
      approved: true,
    });
    console.log(`Created admin user ${email}.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
