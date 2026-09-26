import {attributeIcons} from './attribute-icons.js';
import {artwork, filesFor, publicPath} from './artwork-manifest.js';
import {uiIcons} from './ui-icons.js';

// Public paths stay stable across clients; replace artwork only in this package.
const imageMap = (group, variant = 'large') => Object.freeze(Object.fromEntries(
  Object.entries(artwork)
    .filter(([, entry]) => entry.group === group)
    .map(([key, entry]) => {
      const files = filesFor(entry);
      const file = files[variant] ?? files.large ?? files.small ?? files.tiny;
      return [entry.name ?? key, publicPath(entry, file)];
    }),
));

export const resourceImages = imageMap('resource');
export const lootboxImages = imageMap('lootbox');
export const attributeImages = imageMap('attribute');
export const attributeTinyImages = imageMap('attribute', 'tiny');
export const attributeSmallImages = imageMap('attribute', 'small');
export const slotImages = imageMap('slot');
export const slotTinyImages = imageMap('slot', 'tiny');
export const slotSmallImages = imageMap('slot', 'small');

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
export const uiImages = imageMap('ui');

// Each designation has three visual slots. Missing slots fall back through
// visualFor(), so artwork can be added gradually without changing clients.
const symbolMarker = (group, symbol) => ({group, symbol, variants: {tiny: {symbol}}});
const imageMarkers = Object.fromEntries(Object.entries(artwork).map(([key, entry]) => {
  const files = filesFor(entry);
  const variants = Object.fromEntries(Object.entries(files).map(([slot, file]) => [slot, {image: publicPath(entry, file)}]));
  const image = variants.large?.image ?? variants.small?.image ?? variants.tiny?.image;
  const id = entry.group === 'attribute' ? {id: entry.name} : {};
  const symbol = entry.group === 'attribute' ? {symbol: attributeIcons[entry.name]} : {};
  return [key, {group: entry.group, ...id, image, ...symbol, variants}];
}));

export const markers = Object.freeze({
  ...imageMarkers,
  experience: {group: 'resource', text: 'XP', variants: {tiny: {text: 'XP'}}},
  attribute_boost: {...symbolMarker('attribute', attributeIcons.boost), id: 'boost'},
  moderation: symbolMarker('ui', uiIcons.moderation),
  trophy: symbolMarker('ui', uiIcons.trophy),
  rating: symbolMarker('ui', uiIcons.rating),
  submissions: {
    ...imageMarkers.submissions, symbol: uiIcons.submissions,
    variants: {...imageMarkers.submissions.variants, tiny: {symbol: uiIcons.submissions}},
  },
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
