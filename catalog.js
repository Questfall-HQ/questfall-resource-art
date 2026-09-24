// Public paths stay stable across clients; replace artwork only in this package.
export const resourceImages = Object.freeze({
  gold: '/images/resources/gold.avif',
  silver: '/images/resources/silver.avif',
  essence: '/images/resources/essence.avif',
  mining_points: '/images/resources/mining-points-v3.avif',
});

export const lootboxImages = Object.freeze({
  common: '/images/lootboxes/common.webp',
  uncommon: '/images/lootboxes/uncommon.webp',
  rare: '/images/lootboxes/rare.webp',
  epic: '/images/lootboxes/epic.webp',
  legendary: '/images/lootboxes/legendary.webp',
  mythical: '/images/lootboxes/mythical.webp',
});

export {attributeIcons} from './attribute-icons.js';
export {lootboxIcon} from './lootbox-icon.js';
