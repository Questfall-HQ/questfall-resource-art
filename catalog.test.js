import {expect, test} from 'bun:test';
import {mkdtemp, mkdir, readdir, rm, stat, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import {markerFor, markers, visualFor} from './catalog.js';

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
  expect(markerFor('weekly_reset').image).toMatch(/weekly-reset\.webp$/);
  for (const key of ['qft', 'shards', 'gems', 'attribute_points']) {
    expect(markerFor(key).image).toBeDefined();
  }
  expect(markerFor('experience')).toMatchObject({text: 'XP'});
  expect(markerFor('experience').image).toBeUndefined();
  expect(markerFor('xp')).toBe(markers.experience);
  expect(markerFor('chest_shards')).toBe(markers.shards);
});

test('size variants select optimized attribute artwork and predictable fallbacks', async () => {
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
  expect(visualFor('silver', 'tiny')).toMatchObject({image: markers.silver.image, resolved: 'large'});
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
    expect(await readdir(join(target, 'public/images/resources'))).toHaveLength(9);
    expect(await readdir(join(target, 'public/images/resources'))).not.toContain('experience.webp');
    expect((await readdir(join(target, 'public/images/ui'))).sort()).toEqual(['submissions-object.webp', 'weekly-reset.webp']);
    expect(readdir(join(target, 'public/images/ui-candidates/v1'))).rejects.toThrow();

    const preview = Bun.spawnSync(['bun', script, '--proposals'], {cwd: target});
    expect(preview.exitCode).toBe(0);
    expect(await readdir(join(target, 'public/images/ui-candidates/v1'))).toHaveLength(10);
  } finally {
    await rm(target, {recursive: true, force: true});
  }
});
