import {expect, test} from 'bun:test';
import {mkdtemp, readdir, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {markerFor, markers} from './catalog.js';

const script = fileURLToPath(new URL('./bin/sync.mjs', import.meta.url));

test('product aliases resolve to the selected shared artwork', () => {
  expect(markerFor('quest_bounty')).toBe(markers.mining_points);
  expect(markerFor('personal_silver')).toBe(markers.silver);
  expect(markerFor('space_silver')).toBe(markers.silver);
  expect(markerFor('stamina')).toBe(markers.attribute_stamina);
  expect(markerFor('lootbox_f').image.endsWith('/common.webp')).toBe(true);
  expect(markerFor('lootbox_a').image.endsWith('/mythical.webp')).toBe(true);
  expect(markerFor('attribute_inventory').image.endsWith('/attributes/inventory.png')).toBe(true);
  expect(markerFor('submissions').symbol).toBeDefined();
  for (const key of ['qft', 'experience', 'shards', 'gems', 'attribute_points']) {
    expect(markerFor(key).image).toBeDefined();
  }
  expect(markerFor('xp')).toBe(markers.experience);
  expect(markerFor('chest_shards')).toBe(markers.shards);
});

test('normal sync excludes proposals; preview sync includes them', async () => {
  const target = await mkdtemp(join(tmpdir(), 'questfall-resource-art-'));
  try {
    const active = Bun.spawnSync(['bun', script], {cwd: target});
    expect(active.exitCode).toBe(0);
    expect(await readdir(join(target, 'public/images/attributes'))).toHaveLength(6);
    expect(await readdir(join(target, 'public/images/resources'))).toHaveLength(9);
    expect(await readdir(join(target, 'public/images/ui'))).toContain('submissions-object.webp');
    expect(readdir(join(target, 'public/images/ui-candidates/v1'))).rejects.toThrow();

    const preview = Bun.spawnSync(['bun', script, '--proposals'], {cwd: target});
    expect(preview.exitCode).toBe(0);
    expect(await readdir(join(target, 'public/images/ui-candidates/v1'))).toHaveLength(10);
  } finally {
    await rm(target, {recursive: true, force: true});
  }
});
