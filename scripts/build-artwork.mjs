import {createHash} from 'node:crypto';
import {readFile, readdir, mkdir, stat, writeFile} from 'node:fs/promises';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import {artwork, filesFor, variantSettings, media} from '../artwork-manifest.js';

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

const dimensionsFor = (entry, variant) => entry.dimensions?.[variant] ?? [variantSettings[variant].size, variantSettings[variant].size];

const artifact = async (path, variant, entry) => {
  if (!(await exists(path))) return null;
  const bytes = await readFile(path);
  const metadata = await sharp(bytes).metadata();
  const settings = variantSettings[variant];
  const [width, height] = dimensionsFor(entry, variant);
  if (metadata.format !== 'heif' || metadata.width !== width ||
      metadata.height !== height || !metadata.hasAlpha || bytes.length > settings.maxBytes) {
    throw new Error(`Invalid ${variant} AVIF: ${path} (${metadata.width}x${metadata.height}, ${bytes.length} bytes)`);
  }
  return {bytes: bytes.length, sha256: hash(bytes)};
};

const validateMedia = async (bytes, entry) => {
  if (entry.type === 'image' && /\.(avif|gif)$/.test(entry.output)) {
    const info = await sharp(bytes, {animated: true}).metadata();
    const format = entry.output.endsWith('.avif') ? 'heif' : 'gif';
    if (info.format !== format || !info.width || !info.height ||
        Math.max(info.width, info.height) > 4096 || bytes.length > 2_000_000) {
      throw new Error('Invalid encoded image: ' + entry.source);
    }
    return;
  }
  if (entry.type !== 'video' || !entry.output.endsWith('.mp4') || bytes.length > 10_000_000) {
    throw new Error('Unsupported encoded media: ' + entry.source);
  }
  const boxes = new Set();
  for (let offset = 0; offset < bytes.length;) {
    if (offset + 8 > bytes.length) throw new Error('Truncated MP4 box: ' + entry.source);
    let size = bytes.readUInt32BE(offset);
    const type = bytes.toString('ascii', offset + 4, offset + 8);
    let header = 8;
    if (size === 1) {
      if (offset + 16 > bytes.length) throw new Error('Truncated MP4 extended box: ' + entry.source);
      size = Number(bytes.readBigUInt64BE(offset + 8)); header = 16;
    } else if (size === 0) size = bytes.length - offset;
    if (!Number.isSafeInteger(size) || size < header || offset + size > bytes.length) {
      throw new Error('Invalid MP4 box size: ' + entry.source);
    }
    if (offset === 0 && type !== 'ftyp') throw new Error('Missing MP4 file type: ' + entry.source);
    boxes.add(type); offset += size;
  }
  if (!['ftyp', 'moov', 'mdat'].every(type => boxes.has(type))) {
    throw new Error('Incomplete MP4 container: ' + entry.source);
  }
};

export async function buildArtwork({directory = root, entries = artwork,
  mediaEntries = entries === artwork ? media : {}, check = false, inventory = true} = {}) {
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
    if (!['resource', 'lootbox', 'attribute', 'slot', 'ui'].includes(entry.group)) throw new Error(`Invalid group: ${key}`);
    const sourceSlots = Object.keys(entry.sources ?? {});
    const hasSource = !!entry.source || sourceSlots.length > 0;
    if (!hasSource && !entry.file) throw new Error(`Declare an artwork source or file: ${key}`);
    if (entry.source && entry.file) throw new Error(`Use per-variant sources with an existing file: ${key}`);
    if (entry.file && inventory && !legacyKeys.has(key)) throw new Error(`New artwork needs a source and AVIF variants: ${key}`);
    if (hasSource && !entry.output) throw new Error(`Missing output stem: ${key}`);
    if (sourceSlots.some(slot => !variantSettings[slot] || (entry.file && slot === (entry.slot ?? 'large')))) {
      throw new Error(`Invalid or duplicate variant source: ${key}`);
    }
    if (entry.dimensions && (entry.group !== 'ui' || Object.keys(entry.dimensions).some(slot =>
      !variantSettings[slot] || entry.dimensions[slot].length !== 2 ||
      entry.dimensions[slot].some(size => !Number.isInteger(size) || size < 1)))) {
      throw new Error(`Invalid UI artwork dimensions: ${key}`);
    }
    if (entry.trim != null && (entry.group !== 'ui' || typeof entry.trim !== 'boolean')) {
      throw new Error(`Invalid UI artwork trim: ${key}`);
    }
    if (entry.group === 'attribute' && entry.name !== key.slice('attribute_'.length)) throw new Error(`Invalid attribute name: ${key}`);
    if (entry.group === 'lootbox' && !entry.name) throw new Error(`Missing lootbox name: ${key}`);
    if (entry.group === 'slot' && entry.name !== key.slice('slot_'.length)) throw new Error(`Invalid slot name: ${key}`);
    const directoryName = {resource: '', lootbox: 'lootboxes/', attribute: 'attributes/', slot: 'slots/', ui: 'ui/'}[entry.group];
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
      const [width, height] = dimensionsFor(entry, variant);
      const recipe = {source: sourceInfo.sha256, output: file,
        ...(entry.dimensions ? {width, height} : {size: settings.size}), padding,
        ...(entry.trim === false ? {trim: false} : {}),
        quality: settings.quality, sharp: packageData.devDependencies.sharp};
      const fingerprint = hash(JSON.stringify(recipe));
      const prior = previous.entries?.[key]?.[variant];
      let output;
      try {
        output = await artifact(outputPath, variant, entry);
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
        const innerWidth = width - 2 * padding;
        const innerHeight = height - 2 * padding;
        if (!Number.isInteger(padding) || innerWidth < 1 || innerHeight < 1) throw new Error(`Invalid ${variant} padding: ${key}`);
        const image = sharp(sourceBytes);
        if (entry.trim !== false) image.trim({background: '#00000000'});
        const {info} = await image.clone().toBuffer({resolveWithObject: true});
        if (Math.max(info.width, info.height) < Math.max(innerWidth, innerHeight)) throw new Error(`Source is too small for ${variant}: ${source}`);
        await mkdir(dirname(outputPath), {recursive: true});
        await image
          .resize(innerWidth, innerHeight, {fit: entry.dimensions ? 'fill' : 'contain', background: '#00000000'})
          .extend({top: padding, right: padding, bottom: padding, left: padding, background: '#00000000'})
          .avif({quality: settings.quality, effort: 6, chromaSubsampling: '4:4:4'})
          .toFile(outputPath);
        output = await artifact(outputPath, variant, entry);
        changes.push(`${key}/${variant}`);
      }
      next.entries[key][variant] = {source: sourceInfo, fingerprint, output: {path: file, ...output}};
    }
  }

  for (const [key, entry] of Object.entries(mediaEntries)) {
    if (next.entries[key] || entry.group !== 'nft' || !entry.source.startsWith('sources/') ||
        entry.source.split('/').includes('..') || !entry.output.startsWith('nfts/') ||
        entry.output.split('/').includes('..') || expected.has(entry.output)) {
      throw new Error('Invalid or duplicate encoded media: ' + key);
    }
    expected.add(entry.output); generated++;
    const bytes = await readFile(join(directory, entry.source));
    await validateMedia(bytes, entry);
    const sourceInfo = {path: entry.source, bytes: bytes.length, sha256: hash(bytes)};
    const outputPath = join(directory, 'assets', entry.output);
    const fingerprint = hash(JSON.stringify({mode: 'preserve', source: sourceInfo.sha256,
      type: entry.type, output: entry.output}));
    const previousOutput = await readFile(outputPath).catch(error => {
      if (error.code !== 'ENOENT') throw error;
      return null;
    });
    const same = previousOutput?.equals(bytes) ?? false;
    const current = same && previous.entries?.[key]?.original?.fingerprint === fingerprint;
    if (!current) {
      changes.push(key + '/original');
      if (!check && !same) {
        await mkdir(dirname(outputPath), {recursive: true});
        await writeFile(outputPath, bytes);
      }
    }
    next.entries[key] = {original: {source: sourceInfo, fingerprint,
      output: {path: entry.output, bytes: bytes.length, sha256: sourceInfo.sha256}}};
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
