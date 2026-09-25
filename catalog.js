import {attributeIcons} from './attribute-icons.js';
import {uiIcons} from './ui-icons.js';

// Public paths stay stable across clients; replace artwork only in this package.
export const resourceImages = Object.freeze({
  gold: '/images/resources/gold.avif',
  silver: '/images/resources/silver.avif',
  essence: '/images/resources/essence.avif',
  mining_points: '/images/resources/mining-points-v3.avif',
});

export const lootboxImages = Object.freeze({
  generic: '/images/lootboxes/generic.avif',
  common: '/images/lootboxes/common.webp',
  uncommon: '/images/lootboxes/uncommon.webp',
  rare: '/images/lootboxes/rare.webp',
  epic: '/images/lootboxes/epic.webp',
  legendary: '/images/lootboxes/legendary.webp',
  mythical: '/images/lootboxes/mythical.webp',
});

export const attributeImages = Object.freeze({
  inventory: '/images/attributes/inventory.png',
  mining: '/images/attributes/mining.png',
  crafting: '/images/attributes/crafting.png',
  trading: '/images/attributes/trading.png',
  stamina: '/images/attributes/stamina.png',
  luck: '/images/attributes/luck.png',
});

export const inventoryVariantImages = Object.freeze({
  cube: '/images/attribute-candidates/v2/inventory.png',
  backpack: attributeImages.inventory,
  stack: '/images/inventory-options/v1/stack.png',
  organizer: '/images/inventory-options/v1/organizer.png',
});

// Preview candidates for non-resource interface symbols.
export const uiCandidateImages = Object.freeze({
  submissions: '/images/ui-candidates/v1/submissions.png',
  submissions_form: '/images/ui-candidates/v1/submissions-form.png',
  submissions_proof: '/images/ui-candidates/v1/submissions-proof.png',
  submissions_send: '/images/ui-candidates/v1/submissions-send.png',
  submissions_mail_sealed: '/images/ui-candidates/v1/submissions-mail-sealed.png',
  submissions_mail_open: '/images/ui-candidates/v1/submissions-mail-open.png',
  submissions_mail_sent: '/images/ui-candidates/v1/submissions-mail-sent.png',
  submissions_stamp: '/images/ui-candidates/v1/submissions-stamp.png',
  submissions_letter_square: '/images/ui-candidates/v1/submissions-letter-square.png',
  submissions_letter_outline: '/images/ui-candidates/v1/submissions-letter-outline.svg',
});

// Dimensional counterparts to the single-color UI symbols.
export const uiImages = Object.freeze({
  submissions: '/images/ui/submissions-object.webp',
});

// One mapping from product designations to artwork. Clients choose image or
// symbol according to their layout; aliases share the same marker object.
export const markers = Object.freeze({
  gold: {group: 'resource', image: resourceImages.gold},
  silver: {group: 'resource', image: resourceImages.silver},
  essence: {group: 'resource', image: resourceImages.essence},
  mining_points: {group: 'resource', image: resourceImages.mining_points},
  lootbox: {group: 'lootbox', image: lootboxImages.generic},
  lootbox_f: {group: 'lootbox', image: lootboxImages.common},
  lootbox_e: {group: 'lootbox', image: lootboxImages.uncommon},
  lootbox_d: {group: 'lootbox', image: lootboxImages.rare},
  lootbox_c: {group: 'lootbox', image: lootboxImages.epic},
  lootbox_b: {group: 'lootbox', image: lootboxImages.legendary},
  lootbox_a: {group: 'lootbox', image: lootboxImages.mythical},
  ...Object.fromEntries(Object.keys(attributeImages).map(id => [
    `attribute_${id}`, {group: 'attribute', id, image: attributeImages[id], symbol: attributeIcons[id]},
  ])),
  attribute_boost: {group: 'attribute', id: 'boost', symbol: attributeIcons.boost},
  submissions: {group: 'ui', image: uiImages.submissions, symbol: uiIcons.submissions},
});

export const markerAliases = Object.freeze({
  quest_bounty: 'mining_points',
  personal_silver: 'silver',
  space_silver: 'silver',
  stamina: 'attribute_stamina',
});

export const markerFor = key => markers[markerAliases[key] ?? key] ?? null;

export {attributeIcons, uiIcons};
