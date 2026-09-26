// The active artwork inventory. Sources build AVIF sizes; file entries keep
// approved artwork until that slot is replaced by a generated variant.
export const artwork = Object.freeze({
  gold: {group: 'resource', file: 'gold.avif', output: 'gold', sources: {
    tiny: 'sources/resources/gold-tiny.png', small: 'sources/resources/gold-small.png',
  }},
  silver: {group: 'resource', file: 'silver.avif', output: 'silver', sources: {
    tiny: 'sources/resources/silver-tiny.png', small: 'sources/resources/silver-small.png',
  }},
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

  slot_head: {group: 'slot', name: 'head', source: 'sources/slots/classic/head.png', sources: {tiny: 'sources/slots/classic/tiny/head.png'}, padding: {tiny: 5}, output: 'slots/v4/head'},
  slot_chest: {group: 'slot', name: 'chest', source: 'sources/slots/classic/chest.png', sources: {tiny: 'sources/slots/classic/tiny/chest.png'}, padding: {tiny: 4}, output: 'slots/v4/chest'},
  slot_hands: {group: 'slot', name: 'hands', source: 'sources/slots/classic/hands.png', sources: {tiny: 'sources/slots/classic/tiny/hands.png'}, padding: {tiny: 2}, output: 'slots/v4/hands'},
  slot_legs: {group: 'slot', name: 'legs', source: 'sources/slots/classic/legs.png', sources: {tiny: 'sources/slots/classic/tiny/legs.png'}, padding: {tiny: 8}, output: 'slots/v4/legs'},
  slot_feet: {group: 'slot', name: 'feet', source: 'sources/slots/classic/feet.png', sources: {tiny: 'sources/slots/classic/tiny/feet.png'}, padding: {tiny: 7}, output: 'slots/v4/feet'},
  slot_outer: {group: 'slot', name: 'outer', source: 'sources/slots/classic/outer.png', sources: {tiny: 'sources/slots/classic/tiny/outer.png'}, padding: {tiny: 5}, output: 'slots/v4/outer'},
  slot_potion: {group: 'slot', name: 'potion', source: 'sources/slots/classic/potion.png', output: 'slots/v4/potion'},

  submissions: {group: 'ui', file: 'ui/submissions-object.webp', master: 'sources/ui/submissions-object.png'},
  weekly_reset: {group: 'ui', file: 'ui/weekly-reset.webp'},
  chat_button_glass: {group: 'ui', source: 'sources/ui/chat-button-glass.png', output: 'ui/chat-button-glass'},
});

export const variantSettings = Object.freeze({
  tiny: {size: 64, padding: 4, quality: 82, maxBytes: 15_000},
  small: {size: 128, padding: 7, quality: 82, maxBytes: 30_000},
  // The largest current use is 80 CSS px on the preview stand; 256 px covers 3x displays.
  large: {size: 256, padding: 13, quality: 82, maxBytes: 60_000},
});

export const filesFor = entry => {
  const files = {};
  const slots = entry.source ? Object.keys(variantSettings) : Object.keys(entry.sources ?? {});
  for (const slot of slots) files[slot] = `${entry.output}${slot === 'large' ? '' : `-${slot}`}.avif`;
  if (entry.file) files[entry.slot ?? 'large'] = entry.file;
  return files;
};

export const publicPath = (entry, file) => entry.group === 'resource'
  ? `/images/resources/${file.split('/').at(-1)}`
  : `/images/${file}`;
