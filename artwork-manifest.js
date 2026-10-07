// The active artwork inventory. Sources build AVIF sizes; file entries keep
// approved artwork until that slot is replaced by a generated variant.
export const artwork = Object.freeze({
  daily_quest_completed: {group: 'ui', source: 'sources/ui/daily-actions-v2/quest-completed.png', output: 'ui/daily-actions-v1/quest-completed'},
  daily_lootbox_opened: {group: 'ui', source: 'sources/ui/daily-actions-v2/lootbox-opened.png', output: 'ui/daily-actions-v1/lootbox-opened'},
  daily_lootbox_purchased: {group: 'ui', source: 'sources/ui/daily-actions-v2/lootbox-purchased.png', output: 'ui/daily-actions-v1/lootbox-purchased'},
  daily_item_bought: {group: 'ui', source: 'sources/ui/daily-actions-v2/item-bought.png', output: 'ui/daily-actions-v1/item-bought'},
  daily_item_sold: {group: 'ui', source: 'sources/ui/daily-actions-v2/item-sold.png', output: 'ui/daily-actions-v1/item-sold'},
  daily_item_listed: {group: 'ui', source: 'sources/ui/daily-actions-v2/item-listed.png', output: 'ui/daily-actions-v1/item-listed'},
  daily_item_scrapped: {group: 'ui', source: 'sources/ui/daily-actions-v2/item-scrapped.png', output: 'ui/daily-actions-v1/item-scrapped'},
  daily_item_upgraded: {group: 'ui', source: 'sources/ui/daily-actions-v2/item-upgraded.png', output: 'ui/daily-actions-v1/item-upgraded'},
  daily_item_equipped: {group: 'ui', source: 'sources/ui/daily-actions-v2/item-equipped.png', output: 'ui/daily-actions-v1/item-equipped'},
  daily_gold_converted: {group: 'ui', source: 'sources/ui/daily-actions-v2/gold-converted.png', output: 'ui/daily-actions-v1/gold-converted'},
  daily_character_leveled_up: {group: 'ui', source: 'sources/ui/daily-actions-v2/character-leveled-up.png', output: 'ui/daily-actions-v1/character-leveled-up'},
  daily_character_attribute_spent: {group: 'ui', source: 'sources/ui/daily-actions-v2/character-attribute-spent.png', output: 'ui/daily-actions-v1/character-attribute-spent'},
  daily_moderation_correct: {group: 'ui', source: 'sources/ui/daily-actions-v2/moderation-correct.png', output: 'ui/daily-actions-v1/moderation-correct'},
  gold: {group: 'resource', file: 'gold.avif', output: 'gold', sources: {
    tiny: 'sources/resources/gold-tiny.png', small: 'sources/resources/gold-small.png',
  }},
  silver: {group: 'resource', file: 'silver.avif', output: 'silver', sources: {
    tiny: 'sources/resources/silver-tiny.png', small: 'sources/resources/silver-small.png',
  }},
  essence: {group: 'resource', file: 'essence.avif'},
  mining_points: {group: 'resource', file: 'mining-points-v3.avif'},
  quest_bounty: {group: 'resource', file: 'quest-bounty.webp'},
  qft: {group: 'resource', file: 'qft.webp', retired: true},
  qft_v1: {group: 'resource', designation: 'qft', source: 'sources/resources/qft.png', output: 'qft-v1', retired: true},
  qft_v2: {group: 'resource', designation: 'qft', source: 'sources/resources/qft-v2.png', output: 'qft-v2'},
  shards: {group: 'resource', file: 'shards.webp'},
  gems: {group: 'resource', file: 'gems.webp'},
  gem_f: {group: 'resource', source: 'sources/gems/gem-f.png', output: 'gem-f'},
  gem_e: {group: 'resource', source: 'sources/gems/gem-e.png', output: 'gem-e'},
  gem_d: {group: 'resource', source: 'sources/gems/gem-d.png', output: 'gem-d'},
  gem_c: {group: 'resource', source: 'sources/gems/gem-c.png', output: 'gem-c'},
  gem_b: {group: 'resource', source: 'sources/gems/gem-b.png', output: 'gem-b'},
  gem_a: {group: 'resource', source: 'sources/gems/gem-a.png', output: 'gem-a'},
  dice_e: {group: 'resource', source: 'sources/dice/dice-e.png', output: 'dice-e'},
  dice_d: {group: 'resource', source: 'sources/dice/dice-d.png', output: 'dice-d'},
  dice_c: {group: 'resource', source: 'sources/dice/dice-c.png', output: 'dice-c'},
  dice_b: {group: 'resource', source: 'sources/dice/dice-b.png', output: 'dice-b'},
  dice_a: {group: 'resource', source: 'sources/dice/dice-a.png', output: 'dice-a'},
  dice_cracked_e: {group: 'resource', source: 'sources/dice/cracked/dice-e.png', output: 'dice-cracked-e'},
  dice_cracked_d: {group: 'resource', source: 'sources/dice/cracked/dice-d.png', output: 'dice-cracked-d'},
  dice_cracked_c: {group: 'resource', source: 'sources/dice/cracked/dice-c.png', output: 'dice-cracked-c'},
  dice_cracked_b: {group: 'resource', source: 'sources/dice/cracked/dice-b.png', output: 'dice-cracked-b'},
  dice_cracked_a: {group: 'resource', source: 'sources/dice/cracked/dice-a.png', output: 'dice-cracked-a'},
  gem_cracked_f: {group: 'resource', source: 'sources/gems/cracked/gem-f.png', output: 'gem-cracked-f'},
  gem_cracked_e: {group: 'resource', source: 'sources/gems/cracked/gem-e.png', output: 'gem-cracked-e'},
  gem_cracked_d: {group: 'resource', source: 'sources/gems/cracked/gem-d.png', output: 'gem-cracked-d'},
  gem_cracked_c: {group: 'resource', source: 'sources/gems/cracked/gem-c.png', output: 'gem-cracked-c'},
  gem_cracked_b: {group: 'resource', source: 'sources/gems/cracked/gem-b.png', output: 'gem-cracked-b'},
  gem_cracked_a: {group: 'resource', source: 'sources/gems/cracked/gem-a.png', output: 'gem-cracked-a'},
  attribute_points: {group: 'resource', file: 'attribute-points.svg', slot: 'tiny'},

  lootbox: {group: 'lootbox', name: 'generic', file: 'lootboxes/generic.avif'},
  lootbox_f: {group: 'lootbox', name: 'common', file: 'lootboxes/common.webp', output: 'lootboxes/common', sources: {tiny: 'sources/lootboxes/tiny/common.png'}},
  lootbox_e: {group: 'lootbox', name: 'uncommon', file: 'lootboxes/uncommon.webp', output: 'lootboxes/uncommon', sources: {tiny: 'sources/lootboxes/tiny/uncommon.png'}},
  lootbox_d: {group: 'lootbox', name: 'rare', file: 'lootboxes/rare.webp', output: 'lootboxes/rare', sources: {tiny: 'sources/lootboxes/tiny/rare.png'}},
  lootbox_c: {group: 'lootbox', name: 'epic', file: 'lootboxes/epic.webp', output: 'lootboxes/epic', sources: {tiny: 'sources/lootboxes/tiny/epic.png'}},
  lootbox_b: {group: 'lootbox', name: 'legendary', file: 'lootboxes/legendary.webp', output: 'lootboxes/legendary', sources: {tiny: 'sources/lootboxes/tiny/legendary.png'}},
  lootbox_a: {group: 'lootbox', name: 'mythical', file: 'lootboxes/mythical.webp', output: 'lootboxes/mythical', sources: {tiny: 'sources/lootboxes/tiny/mythical.png'}},

  attribute_inventory: {group: 'attribute', name: 'inventory', source: 'sources/attributes/inventory.png', output: 'attributes/inventory'},
  attribute_mining: {group: 'attribute', name: 'mining', source: 'sources/attributes/mining.png', output: 'attributes/mining'},
  attribute_crafting: {group: 'attribute', name: 'crafting', source: 'sources/attributes/crafting.png', output: 'attributes/crafting'},
  attribute_trading: {group: 'attribute', name: 'trading', source: 'sources/attributes/trading.png', output: 'attributes/trading'},
  attribute_stamina: {group: 'attribute', name: 'stamina', source: 'sources/attributes/stamina.png', output: 'attributes/stamina'},
  attribute_luck: {group: 'attribute', name: 'luck', source: 'sources/attributes/luck.png', output: 'attributes/luck'},

  slot_head: {group: 'slot', name: 'head', source: 'sources/slots/flat-v5/head.png', padding: {tiny: 2}, output: 'slots/v5/head'},
  slot_chest: {group: 'slot', name: 'chest', source: 'sources/slots/flat-v5/chest.png', padding: {tiny: 2}, output: 'slots/v5/chest'},
  slot_hands: {group: 'slot', name: 'hands', source: 'sources/slots/flat-v5/hands.png', padding: {tiny: 2}, output: 'slots/v5/hands'},
  slot_legs: {group: 'slot', name: 'legs', source: 'sources/slots/flat-v5/legs.png', padding: {tiny: 2}, output: 'slots/v5/legs'},
  slot_feet: {group: 'slot', name: 'feet', source: 'sources/slots/flat-v5/feet.png', padding: {tiny: 2}, output: 'slots/v5/feet'},
  slot_outer: {group: 'slot', name: 'outer', source: 'sources/slots/flat-v5/outer.png', padding: {tiny: 2}, output: 'slots/v5/outer'},
  slot_potion: {group: 'slot', name: 'potion', source: 'sources/slots/flat-v5/potion.png', padding: {tiny: 2}, output: 'slots/v5/potion'},

  inventory_count: {group: 'ui', source: 'sources/ui/admin-metrics/inventory-count.png', output: 'ui/admin-metrics/inventory-count'},
  equipped_count: {group: 'ui', source: 'sources/ui/admin-metrics/equipped-count.png', output: 'ui/admin-metrics/equipped-count'},
  quests_7d: {group: 'ui', source: 'sources/ui/admin-metrics/accepted-quests.png', sources: {tiny: 'sources/ui/admin-metrics/accepted-quests-tiny.png'}, output: 'ui/admin-metrics/accepted-quests'},

  submissions: {group: 'ui', file: 'ui/submissions-object.webp', master: 'sources/ui/submissions-object.png'},
  weekly_reset: {group: 'ui', file: 'ui/weekly-reset.webp'},
  chat_button_glass: {group: 'ui', source: 'sources/ui/chat-button-glass.png', output: 'ui/chat-button-glass'},
  reward_gift: {group: 'ui', source: 'sources/ui/reward-gift-v1.png', output: 'ui/reward-gift-v1'},
  tracker_moderation: {group: 'ui', source: 'sources/ui/tracker-moderation-v1.png', output: 'ui/tracker-moderation-v1'},
  inbox_rail_body: {
    group: 'ui', source: 'sources/ui/inbox-rail-v1/body.png', output: 'ui/inbox-rail-v1/body',
    dimensions: {tiny: [44, 148], small: [88, 296], large: [132, 444]},
    padding: {tiny: 0, small: 0, large: 0}, trim: false,
  },
  inbox_rail_counter: {
    group: 'ui', source: 'sources/ui/inbox-rail-v1/counter.png', output: 'ui/inbox-rail-v1/counter',
    padding: {tiny: 0, small: 0, large: 0}, trim: false,
  },
  inbox_clover_idle: {
    group: 'ui', source: 'sources/ui/inbox-clover-v1/idle.png', output: 'ui/inbox-clover-v1/idle',
    trim: false,
    dimensions: {tiny: [64, 80], small: [128, 160], large: [256, 320]},
    padding: {tiny: 0, small: 0, large: 0},
  },
  inbox_clover_chat_unread: {
    group: 'ui', source: 'sources/ui/inbox-clover-v1/chat-unread.png', output: 'ui/inbox-clover-v1/chat-unread',
    trim: false,
    dimensions: {tiny: [64, 80], small: [128, 160], large: [256, 320]},
    padding: {tiny: 0, small: 0, large: 0},
  },
  inbox_tile_idle: {
    group: 'ui', source: 'sources/ui/inbox-tile-v1/idle.png', output: 'ui/inbox-tile-v1/idle',
    trim: false, padding: {tiny: 0, small: 0, large: 0},
  },
  inbox_tile_chat_unread: {
    group: 'ui', source: 'sources/ui/inbox-tile-v1/chat-unread.png', output: 'ui/inbox-tile-v1/chat-unread',
    trim: false, padding: {tiny: 0, small: 0, large: 0},
  },
  glass_action_button: {
    group: 'ui', source: 'sources/ui/glass-action-button.png', output: 'ui/glass-action-button',
    dimensions: {tiny: [128, 38], small: [256, 76], large: [512, 152]},
    padding: {tiny: 2, small: 3, large: 6},
  },
  questfall_logo: {group: 'ui', source: 'sources/ui/questfall-logo.png', output: 'ui/questfall-logo', padding: {tiny: 1}},
  questfall_logo_badge: {group: 'ui', source: 'sources/ui/questfall-logo-badge.png', output: 'ui/questfall-logo-badge', padding: {tiny: 1}},
  questfall_logo_gold: {group: 'ui', source: 'sources/ui/questfall-logo-gold.png', output: 'ui/questfall-logo-gold', padding: {tiny: 1}},
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

// Approved encoded media retains its original geometry, quality and URL.
// The builder copies from sources and verifies source/output hashes in the cache.
export const media = Object.freeze(Object.fromEntries(
  ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythical'].flatMap(name =>
    [['image', 'avif'], ['video', 'mp4']].map(([type, extension]) => [
      `nft_${name}_${type}`,
      Object.freeze({group: 'nft', name, type,
        source: `sources/nfts/${name}.${extension}`, output: `nfts/${name}.${extension}`}),
    ])),
));

export const activeFiles = () => [
  ...Object.values(artwork).flatMap(entry => Object.values(filesFor(entry))
    .map(file => ({file, path: publicPath(entry, file)}))),
  ...Object.values(media).map(entry => ({file: entry.output, path: '/' + entry.output})),
];
