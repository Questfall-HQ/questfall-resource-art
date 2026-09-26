import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../../', import.meta.url));
const output = `${root}sources/slots/tiny`;
const preview = fileURLToPath(new URL('./tiny-preview.png', import.meta.url));
const fill = '#7850a8';
const shade = '#4b2b72';
const light = '#cba1ee';
const dark = '#251737';
const stroke = `stroke="${light}" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"`;

const shapes = {
  head: `
    <path d="M32 6C18 7 10 19 9 42L15 55H49L55 42C54 19 46 7 32 6Z" fill="${fill}" ${stroke}/>
    <path d="M32 17C23 18 18 27 18 41L23 48H41L46 41C46 27 41 18 32 17Z" fill="${dark}" ${stroke}/>
    <path d="M16 52Q32 57 48 52" fill="none" stroke="${shade}" stroke-width="5"/>
  `,
  chest: `
    <path d="M20 9L27 7H37L44 9L58 18L52 31L46 28V55H18V28L12 31L6 18Z" fill="${fill}" ${stroke}/>
    <path d="M27 8L32 19L37 8" fill="${dark}" stroke="${light}" stroke-width="2.7" stroke-linejoin="round"/>
    <path d="M21 31V52M43 31V52" stroke="${shade}" stroke-width="3"/>
  `,
  hands: `
    <g transform="rotate(-12 32 32)">
      <path d="M18 56L13 43L15 32C16 28 20 27 23 30V16C23 12 28 11 30 14V10C30 6 35 6 37 10V15C39 11 44 13 45 17L46 28C48 24 53 26 53 31C53 39 49 47 43 56Z" fill="${fill}" ${stroke}/>
      <path d="M18 47H47L43 56H18Z" fill="${shade}" ${stroke}/>
      <path d="M31 16V33M38 17V33" stroke="${shade}" stroke-width="2.5"/>
    </g>
  `,
  legs: `
    <path d="M17 8H47L50 19L45 56H35L32 32L29 56H19L14 19Z" fill="${fill}" ${stroke}/>
    <path d="M18 17H46" stroke="${light}" stroke-width="4"/>
    <path d="M32 28L35 54M18 25L20 53" stroke="${shade}" stroke-width="3"/>
  `,
  feet: `
    <path d="M20 8H44V36C44 42 48 45 57 47L59 54V57H8V52C8 47 14 45 20 41Z" fill="${fill}" ${stroke}/>
    <path d="M20 19H44" stroke="${light}" stroke-width="4"/>
    <path d="M9 51H58" stroke="${shade}" stroke-width="5"/>
    <path d="M24 38C30 42 35 43 43 43" fill="none" stroke="${shade}" stroke-width="3"/>
  `,
  outer: `
    <path d="M25 8Q32 5 39 8L45 18L57 54Q44 59 32 55Q20 59 7 54L19 18Z" fill="${fill}" ${stroke}/>
    <path d="M31 21L24 53Q28 56 32 55L39 53L33 21Z" fill="${shade}"/>
    <circle cx="32" cy="17" r="4.5" fill="${light}" stroke="${dark}" stroke-width="2"/>
  `,
  potion: `
    <path d="M27 7H37V17C39 20 42 21 45 24C51 29 55 35 55 43C55 52 47 58 32 58S9 52 9 43C9 35 13 29 19 24C22 21 25 20 27 17Z" fill="${shade}" ${stroke}/>
    <path d="M14 37C18 39 23 39 32 39S46 39 50 37V44C50 51 44 54 32 54S14 51 14 44Z" fill="#b447dd"/>
    <path d="M25 18H39M26 8H38" stroke="${light}" stroke-width="5"/>
    <path d="M19 43C20 47 22 49 26 50" fill="none" stroke="#e4b8fb" stroke-width="3"/>
  `,
};

await mkdir(output, {recursive: true});
const images = [];
for (const [id, shape] of Object.entries(shapes)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">${shape}</svg>`;
  const image = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  await sharp(image).toFile(`${output}/${id}.png`);
  images.push(image);
}

const size = 24;
const gap = 12;
const margin = 12;
const width = images.length * size + (images.length - 1) * gap + 2 * margin;
const overlays = await Promise.all(images.map(async (image, index) => ({
  input: await sharp(image).resize(size, size).png().toBuffer(),
  left: margin + index * (size + gap),
  top: margin,
})));
await sharp({create: {width, height: size + 2 * margin, channels: 4, background: '#11141b'}})
  .composite(overlays).png().toFile(preview);
