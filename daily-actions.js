import {visualFor} from './catalog.js';

// The same action scenes are used by the Daily panel and Admin editor.
export const dailyActionMarkers = Object.freeze({
  'quest.completed': 'daily_quest_completed',
  'lootbox.opened': 'daily_lootbox_opened',
  'lootbox.purchased': 'daily_lootbox_purchased',
  'item.bought': 'daily_item_bought',
  'item.sold': 'daily_item_sold',
  'item.listed': 'daily_item_listed',
  'item.scrapped': 'daily_item_scrapped',
  'item.upgraded': 'daily_item_upgraded',
  'item.equipped': 'daily_item_equipped',
  'gold.converted': 'daily_gold_converted',
  'character.leveled_up': 'daily_character_leveled_up',
  'character.attribute_spent': 'daily_character_attribute_spent',
  'moderation.correct': 'daily_moderation_correct',
});

export const dailyActionFor = (action, variant = 'small') => visualFor(dailyActionMarkers[action], variant);
