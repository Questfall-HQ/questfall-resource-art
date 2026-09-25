# Questfall Resource Art

Shared source of truth for static resource, lootbox, attribute, and Submissions
markers in Questfall Application and Admin. This package owns the artwork and
the mapping from product designations to that artwork. The API contract owns
public reward keys; PocketBase owns balances and game rules. Clients own labels,
layout, and the requested visual size.

`catalog.js` exports `markers`, `markerFor(key)`, and `visualFor(key, variant)`.
Every marker has `tiny`, `small`, and `large` visual slots. Each slot can hold
an image, a single-color symbol, or short text. `visualFor` returns the chosen
art and its `requested` and `resolved` variants. Missing slots fall back in
this order: `tiny → small → large`, `small → tiny → large`, and
`large → small → tiny`. Unknown keys return `null`. This lets clients request
the right size now and add artwork for empty slots later without changing
their layouts. Tiny artwork is prepared for dense labels and variable
backgrounds; large artwork is prepared for prominent illustrations.

`artwork-manifest.js` is the active image inventory used by `catalog.js`, the
AVIF builder, and the client sync command. Generated artwork has a source in
`sources/` and an output stem. The builder trims transparent margins and makes
`tiny` (64 px), `small` (128 px), and `large` (256 px) AVIF files. The largest
current display is 80 CSS px on the preview stand, so 256 px covers a 3×
display. Source images are never copied to clients. A variant can use its own
source via `sources: {tiny: 'sources/...png'}` when a small image needs different
art. Per-variant `padding` is available for optical size adjustments.

`artwork-build-cache.json` records the SHA-256 and byte size of each source,
the conversion recipe, and the SHA-256 of each output. `bun run build:artwork`
skips unchanged variants, even after a fresh clone; it rebuilds an output if
its source or recipe changes, or the output is missing or modified. File dates
are not used because checkout can change them without changing image content.
`bun run check:artwork` verifies the cache, AVIF format, dimensions, alpha,
file-size limits, and that every active asset is listed in the manifest. It
never rewrites files. Legacy entries remain explicitly grandfathered until
their source artwork can be recovered and migrated. New images must use the
source-to-AVIF pipeline; SVG symbols and text are separate visual types.

To add an image, put its master file in `sources/`, add one manifest entry, then
run:

```sh
bun run build:artwork
bun run check:artwork
bun test
```

Review the three sizes on Admin's `/system/resources` stand. Commit both the
source and generated AVIFs with the cache, tag the package, then update its
exact tag in Application and Admin. Both clients only copy ready-to-use assets.
Gold and Silver use dedicated, simpler `tiny` and `small` AVIFs; their approved
large coin artwork remains in the legacy `file` slot. For an existing legacy
entry, `file` can coexist with `sources` for the other size slots. Attribute Points
currently have only the flat cyan chevrons, so larger contexts use those until
a large version is chosen. Quest
Bounty has a silver bolt and Mining Points have a gold bolt; XP is text.
`personal_silver` and `space_silver` resolve to Silver, and
`lootbox_a` through `lootbox_f` resolve to their rarity artwork. The generic
`lootbox` has its own chest. `stamina` resolves to the Stamina attribute.
Traits use their parent attribute marker.

QFT, Experience, Chest Shards, Gems, and Attribute Points also have shared
markers. The current QFT image is provisional until its visual identity is
finalized. Chest Shards use the matte violet puzzle piece; the Weekly Reset
hourglass is a shared UI image. Moderation's double check and the trophy used
for Mining and Season are shared single-color UI symbols. `xp` and `chest_shards` are aliases
for Experience and Chest Shards. The earlier Experience book remains in
`proposals/`.

The legacy `image`, `symbol`, and `text` properties on `markerFor` remain for
existing consumers; new components should use `visualFor`.

Active files live under `assets/` and are copied into each client's
`public/images` by:

```sh
bun node_modules/@questfall/resource-art/bin/sync.mjs
```

Earlier experiments remain in `proposals/`. To copy them for a local design
preview, use `sync.mjs --proposals`. Normal builds copy active files only.
The Application's lootbox opening videos and each client's layout-specific
graphics remain local. Welcome reward markers use the same shared entries as
other rewards; its panel background and other decoration remain local.

To update generated artwork, replace its source and run `bun run build:artwork`.
For an existing legacy entry, change its active file until its master is
available for migration. Old tags remain available for open tabs and rollbacks.
