import rateLimit from "express-rate-limit";

/** General API limit — protects against scraping and accidental DoS. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,                  // 300 requests / 15 min / IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

/** Stricter limit for auth endpoints to slow down credential stuffing. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,                   // 10 attempts / 15 min / IP
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // don't penalize legitimate logins
  message: { error: "Too many auth attempts, please try again later." },
});

/** Limit for public write endpoints (contact form, etc.) to deter spam. */
export const writeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,                   // 20 messages / hour / IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions, please try again later." },
});
