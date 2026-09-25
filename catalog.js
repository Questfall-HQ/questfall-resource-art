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

// Raster attribute art currently used in Application.
export const attributeCandidateImages = Object.freeze({
  inventory: '/images/inventory-options/v1/backpack.png',
  mining: '/images/attribute-candidates/v3/mining.png',
  crafting: '/images/attribute-candidates/v3/crafting.png',
  trading: '/images/attribute-candidates/v2/trading.png',
  stamina: '/images/attribute-candidates/v2/stamina.png',
  luck: '/images/attribute-candidates/v2/luck.png',
});

export const inventoryVariantImages = Object.freeze({
  cube: '/images/attribute-candidates/v2/inventory.png',
  backpack: attributeCandidateImages.inventory,
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
});

export {attributeIcons} from './attribute-icons.js';
