import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { fromFile } from "file-type";

/**
 * Reads the first bytes of each uploaded file and checks that the detected
 * MIME type matches what the client claimed. Defeats trivial spoofing
 * (e.g. renaming `evil.html` to `evil.mp4` with `Content-Type: video/mp4`).
 *
 * On mismatch the uploaded files are deleted from disk and the request is
 * rejected with 400.
 */
export async function verifyUploadedFiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const grouped = req.files as
    | { video?: Express.Multer.File[]; poster?: Express.Multer.File[] }
    | undefined;

  // Collect every uploaded file regardless of whether multer used .single()
  // (populates req.file) or .fields() (populates req.files).
  const all: Express.Multer.File[] = [
    ...(grouped?.video ?? []),
    ...(grouped?.poster ?? []),
  ];
  if (req.file) all.push(req.file);

  if (all.length === 0) return next();

  try {
    for (const file of all) {
      const detected = await fromFile(file.path);
      const expectedPrefix = file.fieldname === "video" ? "video/" : "image/";
      if (!detected || !detected.mime.startsWith(expectedPrefix)) {
        // Clean up everything we wrote before rejecting.
        await Promise.all(
          all.map((f) => fs.promises.unlink(f.path).catch(() => {}))
        );
        return res.status(400).json({
          error: `Uploaded ${file.fieldname} file does not match its declared type`,
        });
      }
    }
    next();
  } catch (err) {
    await Promise.all(
      all.map((f) => fs.promises.unlink(f.path).catch(() => {}))
    );
    next(err);
  }
}
