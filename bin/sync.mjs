import {copyFile, mkdir} from 'node:fs/promises';
import {basename, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {lootboxImages, resourceImages} from '../catalog.js';

const source = fileURLToPath(new URL('../assets/', import.meta.url));
const catalogs = [
  {images: resourceImages, source, directory: 'resources', label: 'resource'},
  {images: lootboxImages, source: join(source, 'lootboxes'), directory: 'lootboxes', label: 'lootbox'},
];

for (const catalog of catalogs) {
  const target = join(process.cwd(), 'public/images', catalog.directory);
  await mkdir(target, {recursive: true});
  for (const path of Object.values(catalog.images)) {
    const name = basename(path);
    await copyFile(join(catalog.source, name), join(target, name));
  }
  console.log(`Synced ${Object.keys(catalog.images).length} ${catalog.label} images to ${target}`);
}
