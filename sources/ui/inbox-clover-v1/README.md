# Inbox clover raster backplates

Approved source: the first displayed clover concept (`Круглый клевер`) from the 2026-09-30 exploration.

Generated with the built-in ImageGen tool. PNGs have transparent backgrounds and empty lobe centers; dynamic counters must remain real UI text.

## Layout

- Left lobe: Chat.
- Top lobe: Tracker.
- Bottom lobe: Daily rewards.
- A single connected clover silhouette and a short attachment stem on the right.
- Intended product footprint: approximately 64 × 80 px, preserving the generated aspect ratio and transparent padding.

## Chat behavior

Preserve the current `src/chat/panel.imba` distinction:

- No unread messages or addressed updates: idle image, no chat number.
- General unread messages (`hasUnread`, `attention == 0`): illuminate only the left lobe; show no number, including no zero.
- Mentions or replies addressed to the player (`attention > 0`): illuminate the left lobe and overlay the addressed-message count (capped at `99+`).

Tracker reads `activityUnread`; Daily reads `app.daily.available`. The raster assets contain no counters, so all values can update independently.

## Files

- `idle.png`: neutral glass clover.
- `chat-unread.png`: the same clover with the left/chat glass zone illuminated, without a baked number.
- `PROMPTS.md`: exact generation and edit prompts.
- `manifest.json`: actual PNG dimensions, alpha checks, silhouette comparison and SHA-256 hashes.

These PNG masters belong to `questfall-resource-art`. The artwork manifest builds transparent AVIF variants at 64 × 80, 128 × 160 and 256 × 320 px. Consumers resolve `inbox_clover_idle` and `inbox_clover_chat_unread` through `visualFor` and receive only AVIF files through the normal sync command. `trim: false` preserves the shared source canvas so the two image states remain aligned.

Application integration: `questfall-application/src/chat/launcher.imba`. One native button toggles the panel; the three sections remain internal tabs.
