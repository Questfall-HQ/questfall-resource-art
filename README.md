# Questfall Resource Art

Shared source of truth for static resource, lootbox, attribute, and Submissions
markers in Questfall Application and Admin. This package owns the artwork and
the mapping from product designations to that artwork. The API contract owns
public reward keys; PocketBase owns balances and game rules. Clients own labels,
layout, size, and contextual choice between an image and a symbol.

`catalog.js` exports `markers` and `markerFor(key)`. A marker may have an
`image`, a single-color `symbol`, short `text`, or a combination. For example,
Application displays attribute images while Admin uses their symbols. Quest
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

Attribute Points use three flat cyan chevrons.

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
