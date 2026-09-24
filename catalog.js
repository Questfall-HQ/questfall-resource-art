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

// Experimental raster replacements for the six attribute glyphs.
export const attributeCandidateImages = Object.freeze({
  inventory: '/images/attribute-candidates/inventory.png',
  mining: '/images/attribute-candidates/mining.png',
  crafting: '/images/attribute-candidates/crafting.png',
  trading: '/images/attribute-candidates/trading.png',
  stamina: '/images/attribute-candidates/stamina.png',
  luck: '/images/attribute-candidates/luck.png',
});

export {attributeIcons} from './attribute-icons.js';
