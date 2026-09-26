import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../../', import.meta.url));
const proposal = fileURLToPath(new URL('./', import.meta.url));
const source = `${root}sources/slots/classic/`;
const tiny = `${source}tiny/`;
const ids = ['head', 'chest', 'hands', 'legs', 'feet', 'outer'];

await mkdir(tiny, {recursive: true});
for (const id of ids) {
  await sharp(`${proposal}reference/large/${id}.avif`).png().toFile(`${source}${id}.png`);
  // Keep the old 64 px artwork proportions while giving the package builder
  // enough source pixels for its fixed 64 px output.
  await sharp(`${proposal}reference/tiny/${id}.avif`)
    .resize(256, 256, {fit: 'contain', background: '#00000000'})
    .png().toFile(`${tiny}${id}.png`);
}

const potion = sharp(`${proposal}potion-original.png`).ensureAlpha();
const {data, info} = await potion.clone().raw().toBuffer({resolveWithObject: true});
let minX = info.width, minY = info.height, maxX = -1, maxY = -1;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * info.channels + 3] < 48) continue;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
}
if (maxX < 0) throw new Error('Potion artwork is transparent');
const padding = 12;
const left = Math.max(0, minX - padding);
const top = Math.max(0, minY - padding);
const width = Math.min(info.width, maxX + padding + 1) - left;
const height = Math.min(info.height, maxY + padding + 1) - top;
await potion.extract({left, top, width, height}).png().toFile(`${source}potion.png`);

for (const size of [24, 80]) {
  const cell = size + 16;
  const preview = await Promise.all([...ids, 'potion'].map(async (id, index) => ({
    input: await sharp(id === 'potion' ? `${source}potion.png` : `${tiny}${id}.png`)
      .resize(size, size, {fit:'contain', background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer(),
    left: index * cell + 8,
    top: 8,
  })));
  await sharp({create:{width:7*cell,height:cell,channels:4,background:'#171a23'}})
    .composite(preview).png().toFile(`${proposal}classic-${size}px.png`);
}
