import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const input = fileURLToPath(new URL('./soft-3d.png', import.meta.url));
const output = fileURLToPath(new URL('../../sources/slots/', import.meta.url));
const regions = {
  head: [0, 0, 390, 512],
  chest: [390, 0, 390, 512],
  hands: [780, 0, 400, 512],
  legs: [1180, 0, 356, 512],
  feet: [0, 512, 400, 512],
  outer: [400, 512, 430, 512],
  potion: [830, 512, 390, 512],
};

await mkdir(output, {recursive: true});
for (const [name, [left, top, width, height]] of Object.entries(regions)) {
  const image = sharp(input).extract({left, top, width, height}).ensureAlpha();
  const {data, info} = await image.clone().raw().toBuffer({resolveWithObject: true});
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * info.channels + 3] <= 32) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  if (maxX < 0) throw new Error(`No visible pixels in ${name}`);
  const padding = 10;
  const x = Math.max(0, minX - padding);
  const y = Math.max(0, minY - padding);
  const right = Math.min(width, maxX + padding + 1);
  const bottom = Math.min(height, maxY + padding + 1);
  await image.extract({left: x, top: y, width: right - x, height: bottom - y})
    .png().toFile(`${output}/${name}.png`);
  console.log(`${name}: ${right - x}x${bottom - y}`);
}
