# Inbox glass tile v1 — generation prompts

Generated on 2026-09-30 through built-in `image_gen`, one call per state. The approved source is option1, “Слитная плитка”, at `/Users/fedor/Projects/questfall/design/inbox-launcher-square-2026-09-30/01-solid-tile.png`.

Both original outputs remain in `/Users/fedor/.codex/generated_images/01a0efa9-fe36-7001-8c00-a89781f69993/`. Project masters are unmodified copies with real RGBA transparency; there was no Python, vector, CSS or pixel postprocessing.

## Idle

Input reference: the selected design board.

Original output: `/Users/fedor/.codex/generated_images/01a0efa9-fe36-7001-8c00-a89781f69993/exec-49c92f14-0571-43dd-abe9-e45084e74797.png`.

Tool arguments: `transparent_background: true`, `referenced_image_paths: ["/Users/fedor/Projects/questfall/design/inbox-launcher-square-2026-09-30/01-solid-tile.png"]`.

```text
Use case: ui-mockup.
Asset type: final production raster backplate for a compact 46 x 46 CSS pixel drawer handle in Questfall, not a design board.
Input image 1 is the selected reference board. Match ONLY the large rounded-square glass tile in the upper-left of that board. Extract and recreate that object as one single isolated neutral blank UI backplate.
Subject: a face-on orthographic rounded-square tile. Its outer contour is one continuous softly rounded square; thin polished violet/lavender glass rim, dark smoky purple translucent glass body. Three inset compartments with a quiet T-shaped division: the left compartment occupies full height and approximately48% of internal width, the right half is split into equal top and bottom compartments. The vertical seam is straight; it meets the right horizontal seam exactly at the vertical center. Quiet rounded inset compartment edges, beautifully restrained fine glass reflections.
Neutral idle state: the entire left/chat compartment is smoky dark purple like the right compartments. Absolutely no green, mint, cyan or teal anywhere. No active glow in any compartment. Thin soft lavender reflected light around outer border and upper-left bevel. Centers of ALL THREE compartments completely blank and uncluttered, ready for live text overlaid later.
Composition/framing: single tile centered in a square 1024 x 1024 transparent PNG canvas. Tile fills approximately96% of width and height with only a tiny even transparent margin for a subtle soft shadow. Geometry is square, axis-aligned and symmetrical in outside boundary. Keep flat front view; no perspective, tilt or floating camera view. Outer corner radius about14% of tile width. Maintain reference T layout and proportions.
Materials: premium polished smoky purple glass, subtle optical depth, delicate lavender edge shine, quiet fine surface. The object must remain readable and refined when displayed at46px; avoid dense texture, big glows or thick borders.
Scene/backdrop: real transparent alpha background everywhere outside the tile and subtle shadow. No colored canvas, no checkerboard printed into artwork, no scene or backdrop.
Avoid: every number, text, label, letter, icon, dot, logo, watermark, stem, stalk, clover lobe, repeated tile, board, layout sample or diagram. No green accents in this neutral state. Produce exactly ONE square blank glass tile and nothing else.
```

## Chat unread

Input edit target: the generated idle master.

Original output: `/Users/fedor/.codex/generated_images/01a0efa9-fe36-7001-8c00-a89781f69993/exec-2bb233ac-2a5a-4447-bb3a-8adedf5b2410.png`.

Tool arguments: `transparent_background: true`, `referenced_image_paths: ["/Users/fedor/.codex/generated_images/01a0efa9-fe36-7001-8c00-a89781f69993/exec-49c92f14-0571-43dd-abe9-e45084e74797.png"]`.

```text
Use case: precise-object-edit.
Asset type: chat-unread state for a final 46 x 46 CSS pixel Questfall glass drawer handle.
Input image1 is the EDIT TARGET: the neutral isolated square backplate just generated.
Change ONLY the illumination of the full-height left compartment (Chat). Gently illuminate it with restrained mint green light through smoky glass. A soft mint concentration along the middle-left bevel, faint diffuse light inside the left compartment, and a subtle green reflected edge are enough. Keep the left center blank so live counters can be overlaid later. This state must also communicate unread general chat with no digit.
Strict invariants: preserve the original1254 x1254 square transparent canvas, the exact tile position, scale, outer silhouette, margins, corner radii, border thickness, glass detail, T-shaped seams, left-to-right proportions, every right-side pixel's appearance and lighting. Do not recenter, zoom, shrink, expand or redraw. The upper-right Tracker and lower-right Daily compartments remain completely identical smoky purple. No green spill into either right compartment. Preserve transparency outside the original tile including its shadow, no backdrop.
Keep fine violet/lavender polished outer glass rim and original top-left reflection. Green light should appear subtle and premium, not neon, saturated cyan, an external aura or a thick glow.
No numbers, text, labels, letters, icons, dots, logos, watermark or extra objects. Exactly one blank tile. Preserve all geometry and framing; change only gentle mint illumination within the full-height left compartment.
```

## Inspection

Both outputs are1254 ×1254 PNG, RGBA, with fully transparent and partially transparent pixels. The generated glass body fills approximately89% of the source canvas. All three centers are blank. The unread state adds mint illumination only to the left/chat compartment; right compartments remain visually purple.

The generation retained matching canvas dimensions and seams. It is not pixel-exact: alpha≥128 bounds differ by1–3 source pixels at individual edges, under0.12 CSS pixel at46px. Right-interior RGBA mean absolute change is1.469/255, visually insignificant in native UI size. Exact source hashes, alpha counts and bounding rectangles are in `manifest.json`.

These masters should share one untrimmed zero-padding canvas when converted to AVIF. Counters and accessible text remain live application content.
