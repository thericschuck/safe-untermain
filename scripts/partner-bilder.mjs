// Einmal-Konvertierung der beiden neuen Partner-Fotos in das Web-Format des Projekts.
// Quelle liegt in brand/originals/, Ziel ist public/*.webp — gleiche Parameter wie to-webp.mjs.
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { statSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const jobs = [
  // BMP kann sharp nicht lesen — wurde vorab verlustfrei nach PNG entpackt.
  { in: "brand/originals/safe-aggressionsmanagement.png", out: "public/safe-aggressionsmanagement.webp", width: 1600 },
  { in: "brand/originals/gewaltpraevention-hannover.png", out: "public/gewaltpraevention-hannover-plakat.webp", width: 1400 },
];

for (const job of jobs) {
  const input = path.join(root, job.in);
  const output = path.join(root, job.out);
  await sharp(input)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(output);
  const before = statSync(input).size;
  const after = statSync(output).size;
  console.log(
    `✓ ${job.in} (${(before / 1024).toFixed(0)} KB) → ${job.out} (${(after / 1024).toFixed(0)} KB)`
  );
}
