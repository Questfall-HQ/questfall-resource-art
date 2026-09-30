// Rebuild the five transparent, faceted Dice masters before build:artwork.
import {mkdir} from 'node:fs/promises';
import sharp from 'sharp';

const palettes = {
  e: ['#7ef4ae', '#139b68', '#053f3b'],
  d: ['#93cfff', '#2787dc', '#153d80'],
  c: ['#d8a4ff', '#9254d7', '#392276'],
  b: ['#ffe18a', '#d99730', '#744017'],
  a: ['#ffacd1', '#db4d84', '#732452'],
};

const svg = ([light, mid, dark]) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
<defs>
  <linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${light}"/><stop offset=".42" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></linearGradient>
  <linearGradient id="face" x1=".1" y1="0" x2=".8" y2="1"><stop stop-color="white" stop-opacity=".62"/><stop offset=".3" stop-color="${light}" stop-opacity=".2"/><stop offset="1" stop-color="${dark}" stop-opacity=".65"/></linearGradient>
  <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop stop-color="white"/><stop offset=".4" stop-color="${light}"/><stop offset="1" stop-color="${mid}"/></linearGradient>
  <radialGradient id="shine"><stop stop-color="white" stop-opacity=".75"/><stop offset=".35" stop-color="${light}" stop-opacity=".36"/><stop offset="1" stop-color="${mid}" stop-opacity="0"/></radialGradient>
  <filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="18"/></filter>
</defs>
<path d="M512 84 856 250 948 568 734 850 512 963 290 850 76 568 168 250Z" fill="${mid}" opacity=".5" filter="url(#glow)"/>
<path d="M512 98 849 260 933 566 720 835 512 942 304 835 91 566 175 260Z" fill="url(#body)" stroke="url(#edge)" stroke-width="15" stroke-linejoin="round"/>
<g stroke="${light}" stroke-width="8" stroke-linejoin="round" opacity=".84">
  <path d="M512 98 175 260 312 468 512 396Z" fill="${light}" opacity=".34"/>
  <path d="M512 98 849 260 712 468 512 396Z" fill="${dark}" opacity=".38"/>
  <path d="M175 260 91 566 312 468Z" fill="${dark}" opacity=".56"/>
  <path d="M849 260 933 566 712 468Z" fill="${light}" opacity=".23"/>
  <path d="M91 566 304 835 312 468Z" fill="${light}" opacity=".14"/>
  <path d="M933 566 720 835 712 468Z" fill="${dark}" opacity=".42"/>
  <path d="M312 468 512 396 712 468 720 835 512 942 304 835Z" fill="url(#face)"/>
  <path d="M304 835 512 942 512 696Z" fill="${dark}" opacity=".25"/>
  <path d="M720 835 512 942 512 696Z" fill="${light}" opacity=".16"/>
</g>
<path d="M312 468 512 396 712 468 720 835 512 942 304 835Z" fill="none" stroke="white" stroke-opacity=".56" stroke-width="5"/>
<ellipse cx="290" cy="290" rx="130" ry="65" transform="rotate(-42 290 290)" fill="url(#shine)"/>
<path d="M232 280 499 129 811 280" fill="none" stroke="white" stroke-opacity=".65" stroke-width="13" stroke-linecap="round"/>
<path d="M190 290 109 566 311 816" fill="none" stroke="white" stroke-opacity=".46" stroke-width="8" stroke-linecap="round"/>
<path d="M366 580c42-61 126-83 195-48 26 13 46 32 60 54" fill="none" stroke="white" stroke-width="25" stroke-linecap="round" opacity=".9"/>
<path d="m596 555 29 34-7-46" fill="none" stroke="white" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
<path d="M658 645c-42 62-126 84-196 50-26-13-46-32-60-54" fill="none" stroke="white" stroke-width="25" stroke-linecap="round" opacity=".9"/>
<path d="m428 670-29-33 7 45" fill="none" stroke="white" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
</svg>`;

await mkdir(new URL('../sources/dice/', import.meta.url), {recursive: true});
for (const [rarity, colors] of Object.entries(palettes)) {
  await sharp(Buffer.from(svg(colors))).png().toFile(new URL(`../sources/dice/dice-${rarity}.png`, import.meta.url).pathname);
}
