export interface AttributeIcon {
  viewbox: string;
  paths: readonly string[];
  transform?: string;
}

export declare const attributeIcons: Readonly<Record<"inventory" | "mining" | "crafting" | "trading" | "stamina" | "luck" | "boost", AttributeIcon>>;
