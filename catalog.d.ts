export declare const resourceImages: Readonly<{
  gold: string;
  silver: string;
  essence: string;
  mining_points: string;
  quest_bounty: string;
  qft: string;
  shards: string;
  gems: string;
  attribute_points: string;
}>;

export declare const lootboxImages: Readonly<{
  generic: string;
  common: string;
  uncommon: string;
  rare: string;
  epic: string;
  legendary: string;
  mythical: string;
}>;

export declare const attributeImages: Readonly<{
  inventory: string;
  mining: string;
  crafting: string;
  trading: string;
  stamina: string;
  luck: string;
}>;

export declare const inventoryVariantImages: Readonly<{
  cube: string;
  backpack: string;
  stack: string;
  organizer: string;
}>;

export declare const uiCandidateImages: Readonly<{
  submissions: string;
  submissions_form: string;
  submissions_proof: string;
  submissions_send: string;
  submissions_mail_sealed: string;
  submissions_mail_open: string;
  submissions_mail_sent: string;
  submissions_stamp: string;
  submissions_letter_square: string;
  submissions_letter_outline: string;
}>;

export declare const uiImages: Readonly<{
  submissions: string;
  weekly_reset: string;
}>;

export type MarkerVariant = 'tiny' | 'small' | 'large';
export type MarkerVisual = Readonly<{
  image?: string;
  text?: string;
  symbol?: import('./attribute-icons.js').AttributeIcon | import('./ui-icons.js').UiIcon;
}>;
export type Marker = Readonly<{
  group: 'resource' | 'lootbox' | 'attribute' | 'ui';
  id?: string;
  image?: string;
  text?: string;
  symbol?: import('./attribute-icons.js').AttributeIcon | import('./ui-icons.js').UiIcon;
  variants: Readonly<Partial<Record<MarkerVariant, MarkerVisual>>>;
}>;
export declare const markers: Readonly<Record<string, Marker>>;
export declare const markerAliases: Readonly<Record<string, string>>;
export declare const markerFor: (key: string) => Marker | null;
export declare const visualFor: (key: string, variant?: MarkerVariant) => (MarkerVisual & Readonly<{requested: MarkerVariant; resolved: MarkerVariant}>) | null;

export {attributeIcons, type AttributeIcon} from './attribute-icons.js';
export {uiIcons, type UiIcon} from './ui-icons.js';
