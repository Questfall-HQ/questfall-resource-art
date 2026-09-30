import {copyFile, mkdir, rm} from 'node:fs/promises';
import {basename, dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {artwork, filesFor, publicPath} from '../artwork-manifest.js';
import {attributeImages, inventoryVariantImages, uiCandidateImages} from '../catalog.js';

const source = fileURLToPath(new URL('../assets/', import.meta.url));
const copied = new Set();
for (const entry of Object.values(artwork)) {
  for (const file of Object.values(filesFor(entry))) {
    const target = join(process.cwd(), 'public', publicPath(entry, file));
    if (copied.has(target)) continue;
    await mkdir(dirname(target), {recursive: true});
    await copyFile(join(source, file), target);
    copied.add(target);
  }
}
console.log(`Synced ${copied.size} active resource-art files`);

if (process.argv.includes('--proposals')) {
  const catalogs = [
    {images: {cube: inventoryVariantImages.cube}, source: fileURLToPath(new URL('../proposals/attribute-images-v2/', import.meta.url)), directory: 'attribute-candidates/v2', label: 'attribute proposal'},
    {images: {stack: inventoryVariantImages.stack, organizer: inventoryVariantImages.organizer}, source: fileURLToPath(new URL('../proposals/inventory-options-v1/', import.meta.url)), directory: 'inventory-options/v1', label: 'inventory proposal'},
    {images: uiCandidateImages, source: fileURLToPath(new URL('../proposals/ui-icons-v1/', import.meta.url)), directory: 'ui-candidates/v1', label: 'UI proposal'},
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
}

// These six PNGs were copied by older package versions. They are no longer
// referenced and would otherwise remain in both clients' public bundles.
for (const id of Object.keys(attributeImages)) {
  await rm(join(process.cwd(), 'public/images/attributes', `${id}.png`), {force: true});
}
