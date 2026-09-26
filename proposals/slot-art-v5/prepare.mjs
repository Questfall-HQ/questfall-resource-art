import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const proposal = fileURLToPath(new URL('./', import.meta.url));
const root = fileURLToPath(new URL('../../', import.meta.url));
const ids = ['head', 'chest', 'hands', 'legs', 'feet', 'outer', 'potion'];
const studies = [
  ['material', '01-material.png'],
  ['simplified', '02-simplified.png'],
  ['flat', '03-flat.png'],
];
const gridWidth = 4;
const gridHeight = 2;

for (const [name, file] of studies) {
  const source = `${proposal}raw/${file}`;
  const metadata = await sharp(source).metadata();
  if (metadata.width % gridWidth || metadata.height % gridHeight) {
    throw new Error(`Unexpected sheet dimensions: ${file}`);
  }
  const cellWidth = metadata.width / gridWidth;
  const cellHeight = metadata.height / gridHeight;
  const target = `${proposal}items/${name}/`;
  await mkdir(target, {recursive: true});
  for (const [index, id] of ids.entries()) {
    const cell = await sharp(source).extract({
      left: (index % gridWidth) * cellWidth,
      top: Math.floor(index / gridWidth) * cellHeight,
      width: cellWidth,
      height: cellHeight,
    }).ensureAlpha().raw().toBuffer({resolveWithObject: true});
    // The generator sometimes lets a neighboring object cross a cell edge.
    // Keep the largest opaque island, then crop without changing its pixels.
    const seen = new Uint8Array(cellWidth * cellHeight);
    let largest = {area: 0, left: cellWidth, top: cellHeight, right: -1, bottom: -1};
    for (let start = 0; start < seen.length; start++) {
      if (seen[start] || cell.data[start * cell.info.channels + 3] < 32) continue;
      const component = {area: 0, left: cellWidth, top: cellHeight, right: -1, bottom: -1};
      const queue = [start];
      seen[start] = 1;
      for (let cursor = 0; cursor < queue.length; cursor++) {
        const pixel = queue[cursor];
        const x = pixel % cellWidth;
        const y = Math.floor(pixel / cellWidth);
        component.area++;
        component.left = Math.min(component.left, x);
        component.top = Math.min(component.top, y);
        component.right = Math.max(component.right, x);
        component.bottom = Math.max(component.bottom, y);
        for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const xx = x + dx;
          const yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= cellWidth || yy >= cellHeight) continue;
          const next = yy * cellWidth + xx;
          if (seen[next] || cell.data[next * cell.info.channels + 3] < 32) continue;
          seen[next] = 1;
          queue.push(next);
        }
      }
      if (component.area > largest.area) largest = component;
    }
    const {left, top, right, bottom} = largest;
    if (right < 0) throw new Error(`Missing ${id} in ${file}`);
    const pad = 4;
    const x = Math.max(0, left - pad);
    const y = Math.max(0, top - pad);
    await sharp(source).extract({
      left: (index % gridWidth) * cellWidth + x,
      top: Math.floor(index / gridWidth) * cellHeight + y,
      width: Math.min(cellWidth, right + pad + 1) - x,
      height: Math.min(cellHeight, bottom + pad + 1) - y,
    }).png().toFile(`${target}${id}.png`);
  }
}

// The selected flat set uses a separately generated shirt for the chest slot.
const shirtPath = `${proposal}raw/flat-shirt-v3.png`;
const shirt = sharp(shirtPath).ensureAlpha();
const shirtPixels = await shirt.clone().raw().toBuffer({resolveWithObject: true});
let shirtLeft = shirtPixels.info.width;
let shirtTop = shirtPixels.info.height;
let shirtRight = -1;
let shirtBottom = -1;
for (let y = 0; y < shirtPixels.info.height; y++) for (let x = 0; x < shirtPixels.info.width; x++) {
  if (shirtPixels.data[(y * shirtPixels.info.width + x) * shirtPixels.info.channels + 3] < 32) continue;
  shirtLeft = Math.min(shirtLeft, x);
  shirtTop = Math.min(shirtTop, y);
  shirtRight = Math.max(shirtRight, x);
  shirtBottom = Math.max(shirtBottom, y);
}
if (shirtRight < 0) throw new Error('Generated shirt is transparent');
const shirtPadding = 10;
const shirtX = Math.max(0, shirtLeft - shirtPadding);
const shirtY = Math.max(0, shirtTop - shirtPadding);
await shirt.extract({
  left: shirtX,
  top: shirtY,
  width: Math.min(shirtPixels.info.width, shirtRight + shirtPadding + 1) - shirtX,
  height: Math.min(shirtPixels.info.height, shirtBottom + shirtPadding + 1) - shirtY,
}).png().toFile(`${proposal}items/flat/chest.png`);

const label = (value, x, y, size = 15) => ({
  input: Buffer.from(`<svg width="200" height="30" xmlns="http://www.w3.org/2000/svg"><text x="0" y="${size + 1}" font-family="Arial,sans-serif" font-size="${size}" fill="#bdb4d0">${value}</text></svg>`),
  left: x,
  top: y,
});

for (const size of [24, 80]) {
  const cell = size === 24 ? 74 : 116;
  const row = size === 24 ? 54 : 110;
  const leftMargin = 110;
  const topMargin = 45;
  const width = leftMargin + cell * ids.length + 12;
  const height = topMargin + row * (studies.length + 1) + 12;
  const overlays = [
    ...ids.map((id, index) => label(id.toUpperCase(), leftMargin + index * cell + 5, 11, 11)),
    ...['CURRENT', 'MATERIAL', 'SIMPLIFIED', 'FLAT'].map((name, index) => label(name, 12, topMargin + index * row + (row - 20) / 2, 12)),
  ];
  for (let study = 0; study < studies.length + 1; study++) {
    for (const [index, id] of ids.entries()) {
      const original = `${root}proposals/slot-art-v4/reference/${size === 24 ? 'tiny' : 'large'}/${id}.avif`;
      const originalPotion = `${root}sources/slots/classic/potion.png`;
      const source = study === 0 ? (id === 'potion' ? originalPotion : original) : `${proposal}items/${studies[study - 1][0]}/${id}.png`;
      const input = await sharp(source).resize(size, size, {fit: 'contain', background: '#00000000'}).png().toBuffer();
      overlays.push({input, left: leftMargin + index * cell + Math.floor((cell - size) / 2), top: topMargin + study * row + Math.floor((row - size) / 2)});
    }
  }
  await sharp({create: {width, height, channels: 4, background: '#171322'}})
    .composite(overlays).png().toFile(`${proposal}comparison-${size}px.png`);
}
