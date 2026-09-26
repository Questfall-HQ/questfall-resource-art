import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const directory = fileURLToPath(new URL('.', import.meta.url));
const name = process.argv[2] ?? 'broad-planes-violet';
const writeMasters = process.argv.includes('--masters');
if (!['painted-simplified', 'broad-planes', 'broad-planes-violet'].includes(name)) throw new Error(`Unknown candidate: ${name}`);

const regions = {
  head: [0, 0, 390, 512],
  chest: [390, 0, 390, 512],
  hands: [780, 0, 400, 512],
  legs: [1180, 0, 356, 512],
  feet: [0, 512, 400, 512],
  outer: [400, 512, 430, 512],
  potion: [830, 512, 390, 512],
};

const input = `${directory}${name}.png`;
const masters = fileURLToPath(new URL('../../sources/slots/', import.meta.url));
if (writeMasters) await mkdir(masters, {recursive: true});

const cutouts = [];
for (const [id, [left, top, width, height]] of Object.entries(regions)) {
  const image = sharp(input).extract({left, top, width, height}).ensureAlpha();
  const {data, info} = await image.clone().raw().toBuffer({resolveWithObject: true});
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * info.channels + 3] < 180) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  if (maxX < 0) throw new Error(`No visible pixels in ${id}`);
  const padding = 8;
  const x = Math.max(0, minX - padding);
  const y = Math.max(0, minY - padding);
  const right = Math.min(width, maxX + padding + 1);
  const bottom = Math.min(height, maxY + padding + 1);
  const cutout = await image.extract({left: x, top: y, width: right - x, height: bottom - y}).png().toBuffer();
  cutouts.push(cutout);
  if (writeMasters) await sharp(cutout).toFile(`${masters}/${id}.png`);
  console.log(`${id}: ${right - x}x${bottom - y}`);
}

for (const size of [24, 80]) {
  const gap = size === 24 ? 12 : 20;
  const margin = size === 24 ? 12 : 20;
  const width = 7 * size + 6 * gap + 2 * margin;
  const height = size + 2 * margin;
  const overlays = await Promise.all(cutouts.map(async (cutout, index) => ({
    input: await sharp(cutout).resize(size, size, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}}).png().toBuffer(),
    left: margin + index * (size + gap),
    top: margin,
  })));
  await sharp({create: {width, height, channels: 4, background: '#11141b'}})
    .composite(overlays).png().toFile(`${directory}${name}-${size}px.png`);
}
