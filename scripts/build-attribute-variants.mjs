import {readdir, stat} from 'node:fs/promises';
import {join, parse} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const sourceDirectory = fileURLToPath(new URL('../sources/attributes/', import.meta.url));
const outputDirectory = fileURLToPath(new URL('../assets/attributes/', import.meta.url));
const variants = [
  {name: 'tiny', size: 64, padding: 4, quality: 82},
  {name: 'small', size: 128, padding: 7, quality: 82},
  // The largest current use is 80 CSS px on the preview stand; 256 px covers 3x displays.
  {name: 'large', size: 256, padding: 13, quality: 82},
];

for (const file of (await readdir(sourceDirectory)).filter(name => name.endsWith('.png')).sort()) {
  const source = join(sourceDirectory, file);
  const name = parse(file).name;
  for (const variant of variants) {
    const destination = join(outputDirectory, variant.name === 'large' ? `${name}.avif` : `${name}-${variant.name}.avif`);
    await sharp(source)
      .trim({background: '#00000000'})
      .resize(variant.size - 2 * variant.padding, variant.size - 2 * variant.padding, {
        fit: 'contain', background: '#00000000',
      })
      .extend({
        top: variant.padding, right: variant.padding,
        bottom: variant.padding, left: variant.padding,
        background: '#00000000',
      })
      .avif({quality: variant.quality, effort: 6, chromaSubsampling: '4:4:4'})
      .toFile(destination);
    const {size} = await stat(destination);
    console.log(`${name} ${variant.name}: ${variant.size}px, ${size} bytes`);
  }
}
