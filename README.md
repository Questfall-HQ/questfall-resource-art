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
their layouts. Tiny symbols are intended for dense labels and variable
backgrounds; large images are intended for prominent illustrations.

For example, attributes use flat symbols at `tiny` and object images at
`large`; `small` currently falls back to the symbol. Silver currently has
only a large image, so it is also shown in smaller contexts until a flat
version is chosen. Attribute Points currently have only the flat cyan
chevrons, so larger contexts use those until a large version is chosen. Quest
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

To update artwork, edit the active file or catalog entry here, run `bun test`,
commit and tag a new version, update the exact Git tag in both clients, then
run their checks. Old tags remain available for open tabs and rollbacks.
