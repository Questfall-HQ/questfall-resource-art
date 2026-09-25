import {createHash} from 'node:crypto';
import {readFile, readdir, mkdir, stat, writeFile} from 'node:fs/promises';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import {artwork, filesFor, variantSettings} from '../artwork-manifest.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const cacheFile = 'artwork-build-cache.json';
const hash = value => createHash('sha256').update(value).digest('hex');
const exists = async path => stat(path).then(() => true, () => false);

const allFiles = async directory => {
  if (!(await exists(directory))) return [];
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await allFiles(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
};

const artifact = async (path, variant) => {
  if (!(await exists(path))) return null;
  const bytes = await readFile(path);
  const metadata = await sharp(bytes).metadata();
  const settings = variantSettings[variant];
  if (metadata.format !== 'heif' || metadata.width !== settings.size ||
      metadata.height !== settings.size || !metadata.hasAlpha || bytes.length > settings.maxBytes) {
    throw new Error(`Invalid ${variant} AVIF: ${path} (${metadata.width}x${metadata.height}, ${bytes.length} bytes)`);
  }
  return {bytes: bytes.length, sha256: hash(bytes)};
};

export async function buildArtwork({directory = root, entries = artwork, check = false, inventory = true} = {}) {
  const packageData = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  const cachePath = join(directory, cacheFile);
  const previous = await readFile(cachePath, 'utf8').then(JSON.parse, () => ({entries: {}}));
  const next = {version: 1, entries: {}};
  const expected = new Set();
  const changes = [];
  let generated = 0;
  const legacyKeys = new Set([
    'gold', 'silver', 'essence', 'mining_points', 'quest_bounty', 'qft', 'shards', 'gems',
    'attribute_points', 'lootbox', 'lootbox_f', 'lootbox_e', 'lootbox_d', 'lootbox_c',
    'lootbox_b', 'lootbox_a', 'submissions', 'weekly_reset',
  ]);

  for (const [key, entry] of Object.entries(entries)) {
    if (!['resource', 'lootbox', 'attribute', 'ui'].includes(entry.group)) throw new Error(`Invalid group: ${key}`);
    const sourceSlots = Object.keys(entry.sources ?? {});
    const hasSource = !!entry.source || sourceSlots.length > 0;
    if (!hasSource && !entry.file) throw new Error(`Declare an artwork source or file: ${key}`);
    if (entry.source && entry.file) throw new Error(`Use per-variant sources with an existing file: ${key}`);
    if (entry.file && inventory && !legacyKeys.has(key)) throw new Error(`New artwork needs a source and AVIF variants: ${key}`);
    if (hasSource && !entry.output) throw new Error(`Missing output stem: ${key}`);
    if (sourceSlots.some(slot => !variantSettings[slot] || (entry.file && slot === (entry.slot ?? 'large')))) {
      throw new Error(`Invalid or duplicate variant source: ${key}`);
    }
    if (entry.group === 'attribute' && entry.name !== key.slice('attribute_'.length)) throw new Error(`Invalid attribute name: ${key}`);
    if (entry.group === 'lootbox' && !entry.name) throw new Error(`Missing lootbox name: ${key}`);
    const directoryName = {resource: '', lootbox: 'lootboxes/', attribute: 'attributes/', ui: 'ui/'}[entry.group];
    const location = entry.output ?? entry.file;
    if (!location.startsWith(directoryName) || (entry.group === 'resource' && location.includes('/'))) {
      throw new Error(`Asset must use the ${entry.group} directory: ${key}`);
    }
    if (hasSource && ((entry.source && !entry.source.startsWith('sources/')) ||
      Object.values(entry.sources ?? {}).some(path => !path.startsWith('sources/')))) {
      throw new Error(`Source must live in sources/: ${key}`);
    }
    const files = filesFor(entry);
    for (const file of Object.values(files)) {
      if (file.startsWith('/') || file.split('/').includes('..') || expected.has(file)) throw new Error(`Invalid or duplicate asset path: ${file}`);
      expected.add(file);
    }

    if (entry.file) {
      if (!(await exists(join(directory, 'assets', entry.file)))) throw new Error(`Missing active file: ${entry.file}`);
      if (entry.master && !(await exists(join(directory, entry.master)))) throw new Error(`Missing legacy master: ${entry.master}`);
    }
    if (!hasSource) continue;

    next.entries[key] = {};
    for (const [variant, file] of Object.entries(files)) {
      if (entry.file === file) continue;
      generated++;
      const settings = variantSettings[variant];
      const source = entry.sources?.[variant] ?? entry.source;
      const sourcePath = join(directory, source);
      const outputPath = join(directory, 'assets', file);
      const sourceBytes = await readFile(sourcePath);
      const sourceInfo = {path: source, bytes: sourceBytes.length, sha256: hash(sourceBytes)};
      const padding = entry.padding?.[variant] ?? settings.padding;
      const recipe = {source: sourceInfo.sha256, output: file, size: settings.size, padding,
        quality: settings.quality, sharp: packageData.devDependencies.sharp};
      const fingerprint = hash(JSON.stringify(recipe));
      const prior = previous.entries?.[key]?.[variant];
      let output;
      try {
        output = await artifact(outputPath, variant);
      } catch (error) {
        if (check) throw error;
        output = null;
      }
      const current = prior?.fingerprint === fingerprint && prior?.output?.sha256 === output?.sha256;

      if (!current && check) {
        changes.push(`${key}/${variant}`);
        continue;
      }
      if (!current) {
        const inner = settings.size - 2 * padding;
        if (!Number.isInteger(padding) || inner < 1) throw new Error(`Invalid ${variant} padding: ${key}`);
        const {info} = await sharp(sourceBytes).trim({background: '#00000000'}).toBuffer({resolveWithObject: true});
        if (Math.max(info.width, info.height) < inner) throw new Error(`Source is too small for ${variant}: ${source}`);
        await mkdir(dirname(outputPath), {recursive: true});
        await sharp(sourceBytes)
          .trim({background: '#00000000'})
          .resize(inner, inner, {fit: 'contain', background: '#00000000'})
          .extend({top: padding, right: padding, bottom: padding, left: padding, background: '#00000000'})
          .avif({quality: settings.quality, effort: 6, chromaSubsampling: '4:4:4'})
          .toFile(outputPath);
        output = await artifact(outputPath, variant);
        changes.push(`${key}/${variant}`);
      }
      next.entries[key][variant] = {source: sourceInfo, fingerprint, output: {path: file, ...output}};
    }
  }

  if (inventory) {
    for (const path of await allFiles(join(directory, 'assets'))) {
      const file = relative(join(directory, 'assets'), path);
      if (!expected.has(file)) throw new Error(`Unlisted active asset: ${file}`);
    }
  }
  const cacheText = `${JSON.stringify(next, null, 2)}\n`;
  if (check) {
    if (changes.length || (await readFile(cachePath, 'utf8').catch(() => '')) !== cacheText) {
      throw new Error(`Artwork needs rebuilding: ${changes.join(', ') || 'cache inventory changed'}`);
    }
  } else if ((await readFile(cachePath, 'utf8').catch(() => '')) !== cacheText) {
    await writeFile(cachePath, cacheText);
  }
  return {built: changes, skipped: generated - changes.length};
}

if (import.meta.main) {
  const check = process.argv.includes('--check');
  const result = await buildArtwork({check});
  console.log(check ? 'Artwork is current.' : `Built ${result.built.length} variants; skipped ${result.skipped} unchanged variants.`);
}
