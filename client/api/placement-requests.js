import { createClient } from "@sanity/client";

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  process.env.VITE_SANITY_STUDIO_PROJECT_ID ||
  "";

const dataset =
  process.env.SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  "production";

const token = process.env.SANITY_API_TOKEN || "";
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";

const sanityClient =
  projectId && dataset && token
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token,
      })
    : null;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

function badRequest(res, message) {
  res.statusCode = 400;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: message }));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed." }));
    return;
  }

  if (!sanityClient) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "Placement request service is not configured.",
      }),
    );
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    badRequest(
      res,
      error instanceof Error ? error.message : "Invalid request body.",
    );
    return;
  }

  const clientName = String(body.clientName || "").trim();
  const clientEmail = String(body.clientEmail || "").trim();
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();
  const talentProfileSlug = String(body.talentProfileSlug || "").trim();
  const talentProfileName = String(body.talentProfileName || "").trim();
  const company = String(body.company || "").trim();
  const roleType = String(body.roleType || "Other").trim() || "Other";

  if (
    !clientName ||
    !clientEmail ||
    !subject ||
    !message ||
    !talentProfileSlug
  ) {
    badRequest(res, "Missing required fields.");
    return;
  }

  try {
    const talentProfileId = await sanityClient.fetch(
      `*[_type == "talentProfile" && slug.current == $slug][0]._id`,
      { slug: talentProfileSlug },
    );

    const created = await sanityClient.create({
      _type: "placementRequest",
      clientName,
      clientEmail,
      company,
      roleType,
      subject,
      message,
      talentProfileSlug,
      talentProfileName,
      status: "new",
      submittedAt: new Date().toISOString(),
      ...(talentProfileId
        ? {
            talentProfile: {
              _type: "reference",
              _ref: talentProfileId,
            },
          }
        : {}),
    });

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ _id: created._id }));
  } catch {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Unable to submit request right now." }));
  }
}
