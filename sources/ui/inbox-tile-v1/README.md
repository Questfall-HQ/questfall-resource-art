# Inbox glass tile

Selected visual: first displayed square concept, `Слитная плитка`, from the
2026-09-30 exploration. Application replaces the earlier clover with this tile.

Generated with built-in ImageGen. The PNG masters have transparent backgrounds
and no baked text, icons or counters. `PROMPTS.md` records the exact prompts and
`manifest.json` records the output metadata and source paths.

## Layout and states

- One connected rounded square, displayed at 46 × 46 CSS px.
- Left full-height glass zone: Chat.
- Upper-right glass zone: Tracker.
- Lower-right glass zone: Daily.
- `idle.png`: neutral violet glass without green Chat illumination.
- `chat-unread.png`: the same tile with mint illumination confined to Chat.

General unread messages illuminate Chat without a number. Mentions or replies
illuminate Chat and show the live addressed count, capped at `99+`. Tracker and
Daily counts remain independent UI text. Daily still respects its enablement.

`artwork-manifest.js` exposes `inbox_tile_idle` and `inbox_tile_chat_unread`.
The normal builder produces 64, 128 and 256 px AVIFs. `trim: false` and zero
pipeline padding preserve the source canvases so switching states stays aligned.
Application resolves the small AVIFs in `src/chat/launcher.imba` and receives
them through the normal resource-art sync command.
