// Erzeugt aus dem Schuck-Webdesign-Logo (heller Schriftzug auf fast schwarzem Kasten)
// eine freigestellte Variante: Hintergrund raus, Zeichnung in Paper-Weiss, Alpha = Helligkeit.
//
// Warum Luminanz als Alpha statt Farb-Key: der Schriftzug ist weiss, die Klammern sind
// mittelgrau. Wird beides als Paper mit helligkeits-proportionalem Alpha gerendert,
// entsteht auf dem dunklen Panel exakt derselbe Grauwert wie im Original — nur eben
// ohne mitgeliefertem schwarzen Kasten, so dass die Karte den Hintergrund selbst setzt.
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { statSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SRC = path.join(root, "public", "schuck-webdesign.webp");
const OUT = path.join(root, "public", "schuck-webdesign-mark.webp");

const PAPER = [0xf2, 0xed, 0xe8];
const FLOOR = 13; // Hintergrundhelligkeit #0D0D0D
const CEIL = 240; // ab hier voll deckend

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.alloc(info.width * info.height * 4);
let minX = info.width, minY = info.height, maxX = -1, maxY = -1;

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    const luma = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    const keyed = Math.min(1, Math.max(0, (luma - FLOOR) / (CEIL - FLOOR)));
    const a = Math.round(keyed * (data[i + 3] / 255) * 255);
    const o = (y * info.width + x) * 4;
    out[o] = PAPER[0];
    out[o + 1] = PAPER[1];
    out[o + 2] = PAPER[2];
    out[o + 3] = a;
    if (a > 8) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Eng auf die Zeichnung beschneiden — der Abstand gehoert ins Layout, nicht ins Asset.
await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile(OUT);

const m = await sharp(OUT).metadata();
console.log(
  `✓ schuck-webdesign-mark.webp ${m.width}x${m.height} (${(statSync(OUT).size / 1024).toFixed(1)} KB)`
);
