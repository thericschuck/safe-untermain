import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { statSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, "..", "public");

const files = ["concrete"];

for (const name of files) {
  const input = path.join(pub, `${name}.jpg`);
  const output = path.join(pub, `${name}.webp`);
  await sharp(input).webp({ quality: 82 }).toFile(output);
  const before = statSync(input).size;
  const after = statSync(output).size;
  const saved = (((before - after) / before) * 100).toFixed(1);
  console.log(`✓ ${name}.jpg (${(before / 1024).toFixed(0)} KB) → ${name}.webp (${(after / 1024).toFixed(0)} KB)  −${saved}%`);
}
