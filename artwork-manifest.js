// The active artwork inventory. Entries with a source are built into three
// AVIF sizes; file entries are approved artwork awaiting source migration.
export const artwork = Object.freeze({
  gold: {group: 'resource', file: 'gold.avif'},
  silver: {group: 'resource', file: 'silver.avif'},
  essence: {group: 'resource', file: 'essence.avif'},
  mining_points: {group: 'resource', file: 'mining-points-v3.avif'},
  quest_bounty: {group: 'resource', file: 'quest-bounty.webp'},
  qft: {group: 'resource', file: 'qft.webp'},
  shards: {group: 'resource', file: 'shards.webp'},
  gems: {group: 'resource', file: 'gems.webp'},
  attribute_points: {group: 'resource', file: 'attribute-points.svg', slot: 'tiny'},

  lootbox: {group: 'lootbox', name: 'generic', file: 'lootboxes/generic.avif'},
  lootbox_f: {group: 'lootbox', name: 'common', file: 'lootboxes/common.webp'},
  lootbox_e: {group: 'lootbox', name: 'uncommon', file: 'lootboxes/uncommon.webp'},
  lootbox_d: {group: 'lootbox', name: 'rare', file: 'lootboxes/rare.webp'},
  lootbox_c: {group: 'lootbox', name: 'epic', file: 'lootboxes/epic.webp'},
  lootbox_b: {group: 'lootbox', name: 'legendary', file: 'lootboxes/legendary.webp'},
  lootbox_a: {group: 'lootbox', name: 'mythical', file: 'lootboxes/mythical.webp'},

  attribute_inventory: {group: 'attribute', name: 'inventory', source: 'sources/attributes/inventory.png', output: 'attributes/inventory'},
  attribute_mining: {group: 'attribute', name: 'mining', source: 'sources/attributes/mining.png', output: 'attributes/mining'},
  attribute_crafting: {group: 'attribute', name: 'crafting', source: 'sources/attributes/crafting.png', output: 'attributes/crafting'},
  attribute_trading: {group: 'attribute', name: 'trading', source: 'sources/attributes/trading.png', output: 'attributes/trading'},
  attribute_stamina: {group: 'attribute', name: 'stamina', source: 'sources/attributes/stamina.png', output: 'attributes/stamina'},
  attribute_luck: {group: 'attribute', name: 'luck', source: 'sources/attributes/luck.png', output: 'attributes/luck'},

  submissions: {group: 'ui', file: 'ui/submissions-object.webp', master: 'sources/ui/submissions-object.png'},
  weekly_reset: {group: 'ui', file: 'ui/weekly-reset.webp'},
});

export const variantSettings = Object.freeze({
  tiny: {size: 64, padding: 4, quality: 82, maxBytes: 15_000},
  small: {size: 128, padding: 7, quality: 82, maxBytes: 30_000},
  // The largest current use is 80 CSS px on the preview stand; 256 px covers 3x displays.
  large: {size: 256, padding: 13, quality: 82, maxBytes: 60_000},
});

export const filesFor = entry => entry.source ? {
  tiny: `${entry.output}-tiny.avif`,
  small: `${entry.output}-small.avif`,
  large: `${entry.output}.avif`,
} : {[entry.slot ?? 'large']: entry.file};

export const publicPath = (entry, file) => entry.group === 'resource'
  ? `/images/resources/${file.split('/').at(-1)}`
  : `/images/${file}`;
