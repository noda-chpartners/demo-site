import { readdir, stat, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const thumbsDir = path.resolve(__dirname, '..', 'public', 'thumbnails');

// Target sizes (width in CSS px) & encode quality.
// - card: small, aggressive. Used in LP list grid.
// - pc:   modal PC preview, mid-size WebP.
// - sp:   modal SP preview, small WebP.
const PRESETS = {
  card: { maxWidth: 720, quality: 70, effort: 5 },
  pc:   { maxWidth: 1600, quality: 78, effort: 5 },
  sp:   { maxWidth: 780, quality: 78, effort: 5 },
};

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function optimize(inputPath, outputPath, preset) {
  const before = (await stat(inputPath)).size;

  const tmp = outputPath + '.tmp.webp';
  await sharp(inputPath, { failOn: 'none' })
    .rotate()
    .resize({ width: preset.maxWidth, withoutEnlargement: true })
    .webp({ quality: preset.quality, effort: preset.effort })
    .toFile(tmp);

  // Replace atomically.
  await rename(tmp, outputPath);

  const after = (await stat(outputPath)).size;
  const saved = before > 0 ? ((before - after) / before) * 100 : 0;
  console.log(
    `  ${path.basename(outputPath).padEnd(22)}  ${formatBytes(before).padStart(9)} -> ${formatBytes(after).padStart(9)}  (-${saved.toFixed(0)}%)`,
  );
  return { before, after };
}

async function main() {
  const files = await readdir(thumbsDir);
  const pcFiles = files.filter((f) => /-pc\.webp$/i.test(f)).sort();

  let totalBefore = 0;
  let totalAfter = 0;

  for (const pcFile of pcFiles) {
    const base = pcFile.replace(/-pc\.webp$/i, '');
    const pcPath = path.join(thumbsDir, pcFile);
    const spPath = path.join(thumbsDir, `${base}-sp.webp`);
    const cardPath = path.join(thumbsDir, `${base}-card.webp`);

    console.log(`\n${base}`);

    // Generate card variant from the PC source (it's larger / has hero layout).
    const cardResult = await optimize(pcPath, cardPath, PRESETS.card);
    totalBefore += cardResult.before;
    totalAfter += cardResult.after;

    // Compress PC in-place.
    const pcResult = await optimize(pcPath, pcPath, PRESETS.pc);
    totalBefore += pcResult.before;
    totalAfter += pcResult.after;

    // Compress SP in-place if present.
    if (existsSync(spPath)) {
      const spResult = await optimize(spPath, spPath, PRESETS.sp);
      totalBefore += spResult.before;
      totalAfter += spResult.after;
    }
  }

  const savedPct = totalBefore > 0 ? ((totalBefore - totalAfter) / totalBefore) * 100 : 0;
  console.log('\n============================================================');
  console.log(`Total: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)}  (-${savedPct.toFixed(0)}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
