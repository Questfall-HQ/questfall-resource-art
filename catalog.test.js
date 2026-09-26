import {expect, test} from 'bun:test';
import {mkdtemp, mkdir, readFile, readdir, rm, stat, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import {markerFor, markers, slotImages, slotTinyImages, visualFor} from './catalog.js';
import {buildArtwork} from './scripts/build-artwork.mjs';

const script = fileURLToPath(new URL('./bin/sync.mjs', import.meta.url));

test('product aliases resolve to the selected shared artwork', () => {
  expect(markerFor('quest_bounty')).not.toBe(markers.mining_points);
  expect(markerFor('quest_bounty').image).toMatch(/quest-bounty\.webp$/);
  expect(markerFor('mining_points').image).toMatch(/mining-points-v3\.avif$/);
  expect(markerFor('personal_silver')).toBe(markers.silver);
  expect(markerFor('space_silver')).toBe(markers.silver);
  expect(markerFor('stamina')).toBe(markers.attribute_stamina);
  expect(markerFor('lootbox_f').image.endsWith('/common.webp')).toBe(true);
  expect(markerFor('lootbox_a').image.endsWith('/mythical.webp')).toBe(true);
  expect(markerFor('attribute_inventory').image.endsWith('/attributes/inventory.avif')).toBe(true);
  expect(markerFor('submissions').symbol).toBeDefined();
  expect(markerFor('moderation').symbol.viewbox).toBe('0 0 384 512');
  expect(markerFor('trophy').symbol.viewbox).toBe('0 0 512 512');
  expect(markerFor('rating').symbol).toBeDefined();
  expect(markerFor('weekly_reset').image).toMatch(/weekly-reset\.webp$/);
  for (const id of ['head', 'chest', 'hands', 'legs', 'feet', 'outer', 'potion']) {
    expect(slotImages[id]).toBe(`/images/slots/v2/${id}.avif`);
    expect(slotTinyImages[id]).toBe(`/images/slots/v2/${id}-tiny.avif`);
    expect(markerFor(`slot_${id}`).group).toBe('slot');
  }
  for (const key of ['qft', 'shards', 'gems', 'attribute_points']) {
    expect(markerFor(key).image).toBeDefined();
  }
  expect(markerFor('experience')).toMatchObject({text: 'XP'});
  expect(markerFor('experience').image).toBeUndefined();
  expect(markerFor('xp')).toBe(markers.experience);
  expect(markerFor('chest_shards')).toBe(markers.shards);
});

test('size variants select optimized artwork and predictable fallbacks', async () => {
  for (const id of ['inventory', 'mining', 'crafting', 'trading', 'stamina', 'luck']) {
    const key = `attribute_${id}`;
    const tiny = visualFor(key, 'tiny');
    const small = visualFor(key, 'small');
    expect(tiny).toMatchObject({resolved: 'tiny', image: `/images/attributes/${id}-tiny.avif`});
    expect(small).toMatchObject({resolved: 'small', image: `/images/attributes/${id}-small.avif`});
    expect(visualFor(key, 'large').image).toBe(markers[key].image);
    for (const variant of [tiny, small]) {
      const file = fileURLToPath(new URL(`./assets/attributes/${variant.image.split('/').at(-1)}`, import.meta.url));
      expect((await stat(file)).size).toBeLessThan(10_000);
      const metadata = await sharp(file).metadata();
      expect(metadata.format).toBe('heif');
      expect(metadata.hasAlpha).toBe(true);
      expect(metadata.width).toBe(variant === tiny ? 64 : 128);
    }
    const largeFile = fileURLToPath(new URL(`./assets/attributes/${id}.avif`, import.meta.url));
    expect((await stat(largeFile)).size).toBeLessThan(50_000);
    const largeMetadata = await sharp(largeFile).metadata();
    expect(largeMetadata.format).toBe('heif');
    expect(largeMetadata.hasAlpha).toBe(true);
    expect(largeMetadata.width).toBe(256);
  }
  expect(visualFor('submissions', 'tiny').symbol).toBeDefined();
  expect(visualFor('submissions', 'large').image).toBe(markers.submissions.image);
  for (const coin of ['gold', 'silver']) {
    for (const [variant, size] of [['tiny', 64], ['small', 128]]) {
      expect(visualFor(coin, variant)).toMatchObject({
        image: `/images/resources/${coin}-${variant}.avif`, resolved: variant,
      });
      const file = fileURLToPath(new URL(`./assets/${coin}-${variant}.avif`, import.meta.url));
      const metadata = await sharp(file).metadata();
      expect(metadata.format).toBe('heif');
      expect(metadata.hasAlpha).toBe(true);
      expect(metadata.width).toBe(size);
    }
    expect(visualFor(coin, 'large')).toMatchObject({image: `/images/resources/${coin}.avif`, resolved: 'large'});
  }
  expect(visualFor('attribute_points', 'large')).toMatchObject({image: markers.attribute_points.image, resolved: 'tiny'});
  expect(visualFor('xp', 'large')).toMatchObject({text: 'XP', resolved: 'tiny'});
  expect(visualFor('missing', 'tiny')).toBeNull();
  for (const key of Object.keys(markers)) {
    expect(visualFor(key, 'tiny')).not.toBeNull();
    expect(visualFor(key, 'small')).not.toBeNull();
    expect(visualFor(key, 'large')).not.toBeNull();
  }
});

test('normal sync excludes proposals; preview sync includes them', async () => {
  const target = await mkdtemp(join(tmpdir(), 'questfall-resource-art-'));
  try {
    await mkdir(join(target, 'public/images/attributes'), {recursive: true});
    await writeFile(join(target, 'public/images/attributes/mining.png'), 'legacy package artwork');
    const active = Bun.spawnSync(['bun', script], {cwd: target});
    expect(active.exitCode).toBe(0);
    expect(await readdir(join(target, 'public/images/attributes'))).toHaveLength(18);
    expect(await readdir(join(target, 'public/images/attributes'))).not.toContain('mining.png');
    expect(await readdir(join(target, 'public/images/resources'))).toHaveLength(13);
    expect(await readdir(join(target, 'public/images/slots/v2'))).toHaveLength(21);
    expect(await readdir(join(target, 'public/images/resources'))).not.toContain('experience.webp');
    expect((await readdir(join(target, 'public/images/ui'))).sort()).toEqual([
      'chat-button-glass-small.avif', 'chat-button-glass-tiny.avif', 'chat-button-glass.avif',
      'submissions-object.webp', 'weekly-reset.webp',
    ]);
    expect(readdir(join(target, 'public/images/ui-candidates/v1'))).rejects.toThrow();

    const preview = Bun.spawnSync(['bun', script, '--proposals'], {cwd: target});
    expect(preview.exitCode).toBe(0);
    expect(await readdir(join(target, 'public/images/ui-candidates/v1'))).toHaveLength(10);
  } finally {
    await rm(target, {recursive: true, force: true});
  }
});

test('existing large artwork can gain cached tiny and small sources', async () => {
  const target = await mkdtemp(join(tmpdir(), 'questfall-artwork-hybrid-'));
  const entries = {coin: {group: 'resource', file: 'coin.avif', output: 'coin', sources: {
    tiny: 'sources/coin-tiny.png', small: 'sources/coin-small.png',
  }}};
  const source = color => sharp({create: {width: 512, height: 512, channels: 4, background: color}}).png().toBuffer();
  try {
    await mkdir(join(target, 'sources'), {recursive: true});
    await mkdir(join(target, 'assets'), {recursive: true});
    await writeFile(join(target, 'sources/coin-tiny.png'), await source('#ff0000'));
    await writeFile(join(target, 'sources/coin-small.png'), await source('#0000ff'));
    const large = await sharp(await source('#888888')).avif().toBuffer();
    await writeFile(join(target, 'assets/coin.avif'), large);

    expect((await buildArtwork({directory: target, entries, inventory: false})).built).toEqual(['coin/tiny', 'coin/small']);
    expect((await buildArtwork({directory: target, entries, inventory: false})).built).toEqual([]);
    expect(await readFile(join(target, 'assets/coin.avif'))).toEqual(large);
    await buildArtwork({directory: target, entries, inventory: false, check: true});

    await writeFile(join(target, 'sources/coin-tiny.png'), await source('#00ff00'));
    expect((await buildArtwork({directory: target, entries, inventory: false})).built).toEqual(['coin/tiny']);
    expect(await readFile(join(target, 'assets/coin.avif'))).toEqual(large);
  } finally {
    await rm(target, {recursive: true, force: true});
  }
});

test('artwork build skips unchanged sources and rebuilds only changed or missing variants', async () => {
  const target = await mkdtemp(join(tmpdir(), 'questfall-artwork-build-'));
  const entries = {sample: {
    group: 'resource', source: 'sources/sample.png',
    sources: {small: 'sources/small.png'}, output: 'sample',
  }};
  const source = color => sharp({create: {width: 512, height: 512, channels: 4, background: color}}).png().toBuffer();
  try {
    await mkdir(join(target, 'sources'), {recursive: true});
    await writeFile(join(target, 'sources/sample.png'), await source('#ff0000'));
    await writeFile(join(target, 'sources/small.png'), await source('#0000ff'));

    expect((await buildArtwork({directory: target, entries, inventory: false})).built).toEqual([
      'sample/tiny', 'sample/small', 'sample/large',
    ]);
    expect((await buildArtwork({directory: target, entries, inventory: false})).built).toEqual([]);
    await buildArtwork({directory: target, entries, inventory: false, check: true});

    const tinyBefore = await readFile(join(target, 'assets/sample-tiny.avif'));
    const smallBefore = await readFile(join(target, 'assets/sample-small.avif'));
    await writeFile(join(target, 'sources/small.png'), await source('#00ff00'));
    await expect(buildArtwork({directory: target, entries, inventory: false, check: true})).rejects.toThrow('sample/small');
    expect((await buildArtwork({directory: target, entries, inventory: false})).built).toEqual(['sample/small']);
    expect(await readFile(join(target, 'assets/sample-tiny.avif'))).toEqual(tinyBefore);
    expect(await readFile(join(target, 'assets/sample-small.avif'))).not.toEqual(smallBefore);

    await rm(join(target, 'assets/sample-tiny.avif'));
    expect((await buildArtwork({directory: target, entries, inventory: false})).built).toEqual(['sample/tiny']);
  } finally {
    await rm(target, {recursive: true, force: true});
  }
});
