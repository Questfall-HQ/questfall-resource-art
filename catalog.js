import {attributeIcons} from './attribute-icons.js';
import {uiIcons} from './ui-icons.js';

// Public paths stay stable across clients; replace artwork only in this package.
export const resourceImages = Object.freeze({
  gold: '/images/resources/gold.avif',
  silver: '/images/resources/silver.avif',
  essence: '/images/resources/essence.avif',
  mining_points: '/images/resources/mining-points-v3.avif',
  quest_bounty: '/images/resources/quest-bounty.webp',
  qft: '/images/resources/qft.webp',
  shards: '/images/resources/shards.webp',
  gems: '/images/resources/gems.webp',
  attribute_points: '/images/resources/attribute-points.svg',
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
  inventory: '/images/attributes/inventory.avif',
  mining: '/images/attributes/mining.avif',
  crafting: '/images/attributes/crafting.avif',
  trading: '/images/attributes/trading.avif',
  stamina: '/images/attributes/stamina.avif',
  luck: '/images/attributes/luck.avif',
});

export const attributeTinyImages = Object.freeze(Object.fromEntries(
  Object.keys(attributeImages).map(id => [id, `/images/attributes/${id}-tiny.avif`]),
));

export const attributeSmallImages = Object.freeze(Object.fromEntries(
  Object.keys(attributeImages).map(id => [id, `/images/attributes/${id}-small.avif`]),
));

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

// Shared UI artwork; some entries also have single-color symbol counterparts.
export const uiImages = Object.freeze({
  submissions: '/images/ui/submissions-object.webp',
  weekly_reset: '/images/ui/weekly-reset.webp',
});

// Each designation has three visual slots. Missing slots fall back through
// visualFor(), so artwork can be added gradually without changing clients.
const imageMarker = (group, image, variant = 'large') => ({group, image, variants: {[variant]: {image}}});
const symbolMarker = (group, symbol) => ({group, symbol, variants: {tiny: {symbol}}});

export const markers = Object.freeze({
  gold: imageMarker('resource', resourceImages.gold),
  silver: imageMarker('resource', resourceImages.silver),
  essence: imageMarker('resource', resourceImages.essence),
  mining_points: imageMarker('resource', resourceImages.mining_points),
  quest_bounty: imageMarker('resource', resourceImages.quest_bounty),
  qft: imageMarker('resource', resourceImages.qft),
  experience: {group: 'resource', text: 'XP', variants: {tiny: {text: 'XP'}}},
  shards: imageMarker('resource', resourceImages.shards),
  gems: imageMarker('resource', resourceImages.gems),
  attribute_points: imageMarker('resource', resourceImages.attribute_points, 'tiny'),
  lootbox: imageMarker('lootbox', lootboxImages.generic),
  lootbox_f: imageMarker('lootbox', lootboxImages.common),
  lootbox_e: imageMarker('lootbox', lootboxImages.uncommon),
  lootbox_d: imageMarker('lootbox', lootboxImages.rare),
  lootbox_c: imageMarker('lootbox', lootboxImages.epic),
  lootbox_b: imageMarker('lootbox', lootboxImages.legendary),
  lootbox_a: imageMarker('lootbox', lootboxImages.mythical),
  ...Object.fromEntries(Object.keys(attributeImages).map(id => [
    `attribute_${id}`, {
      group: 'attribute', id, image: attributeImages[id], symbol: attributeIcons[id],
      variants: {
        tiny: {image: attributeTinyImages[id]},
        small: {image: attributeSmallImages[id]},
        large: {image: attributeImages[id]},
      },
    },
  ])),
  attribute_boost: {...symbolMarker('attribute', attributeIcons.boost), id: 'boost'},
  moderation: symbolMarker('ui', uiIcons.moderation),
  trophy: symbolMarker('ui', uiIcons.trophy),
  submissions: {
    group: 'ui', image: uiImages.submissions, symbol: uiIcons.submissions,
    variants: {tiny: {symbol: uiIcons.submissions}, large: {image: uiImages.submissions}},
  },
  weekly_reset: imageMarker('ui', uiImages.weekly_reset),
});

export const markerAliases = Object.freeze({
  personal_silver: 'silver',
  space_silver: 'silver',
  stamina: 'attribute_stamina',
  xp: 'experience',
  chest_shards: 'shards',
});

export const markerFor = key => markers[markerAliases[key] ?? key] ?? null;

const fallbackOrder = Object.freeze({
  tiny: ['tiny', 'small', 'large'],
  small: ['small', 'tiny', 'large'],
  large: ['large', 'small', 'tiny'],
});

export const visualFor = (key, variant = 'small') => {
  const marker = markerFor(key);
  if (!marker) return null;
  const requested = fallbackOrder[variant] ? variant : 'small';
  for (const resolved of fallbackOrder[requested]) {
    const visual = marker.variants[resolved];
    if (visual?.image || visual?.symbol || visual?.text) {
      return {...visual, requested, resolved};
    }
  }
  return null;
};

export {attributeIcons, uiIcons};
