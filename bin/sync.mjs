import {copyFile, mkdir} from 'node:fs/promises';
import {basename, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {attributeCandidateImages, inventoryVariantImages, lootboxImages, resourceImages, uiCandidateImages} from '../catalog.js';

const source = fileURLToPath(new URL('../assets/', import.meta.url));
const attributeV2Images = Object.fromEntries(
  Object.entries({...attributeCandidateImages, cube: inventoryVariantImages.cube})
    .filter(([, path]) => path.startsWith('/images/attribute-candidates/v2/')),
);
const attributeV3Images = Object.fromEntries(
  Object.entries(attributeCandidateImages)
    .filter(([, path]) => path.startsWith('/images/attribute-candidates/v3/')),
);
const inventoryOptions = Object.fromEntries(
  Object.entries(inventoryVariantImages).filter(([key]) => key !== 'cube'),
);
const catalogs = [
  {images: resourceImages, source, directory: 'resources', label: 'resource'},
  {images: lootboxImages, source: join(source, 'lootboxes'), directory: 'lootboxes', label: 'lootbox'},
  {images: attributeV2Images, source: fileURLToPath(new URL('../proposals/attribute-images-v2/', import.meta.url)), directory: 'attribute-candidates/v2', label: 'attribute candidate'},
  {images: attributeV3Images, source: fileURLToPath(new URL('../proposals/attribute-images-v3/', import.meta.url)), directory: 'attribute-candidates/v3', label: 'refined attribute'},
  {images: inventoryOptions, source: fileURLToPath(new URL('../proposals/inventory-options-v1/', import.meta.url)), directory: 'inventory-options/v1', label: 'inventory option'},
  {images: uiCandidateImages, source: fileURLToPath(new URL('../proposals/ui-icons-v1/', import.meta.url)), directory: 'ui-candidates/v1', label: 'UI candidate'},
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
