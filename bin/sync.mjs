import {copyFile, mkdir} from 'node:fs/promises';
import {basename, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {resourceImages} from '../catalog.js';

const source = fileURLToPath(new URL('../assets/', import.meta.url));
const target = join(process.cwd(), 'public/images/resources');

await mkdir(target, {recursive: true});
for (const path of Object.values(resourceImages)) {
  const name = basename(path);
  await copyFile(join(source, name), join(target, name));
}

console.log(`Synced ${Object.keys(resourceImages).length} resource images to ${target}`);
