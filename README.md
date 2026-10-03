# Questfall Resource Art

Shared source of truth for static resource, lootbox, attribute, equipment slot, and Submissions
markers in Questfall Application and Admin. This package owns the artwork and
the mapping from product designations to that artwork. The API contract owns
public reward keys; PocketBase owns balances and game rules. Clients own labels,
layout, and the requested visual size.

`catalog.js` exports `markers`, `markerFor(key)`, and `visualFor(key, variant)`.
It also exports `slotImages`, `slotTinyImages`, and `slotSmallImages` for the
seven RPG categories (six equipment slots and the potion filter). Application
uses one shared set in equipment placeholders, inventory, and Marketplace.
The current slot images live under `/images/slots/v5/`, so their URLs change
when the artwork changes despite long browser image caches. Earlier client
tabs can continue using the first `/images/slots/` files.
The active set uses seven simple, bright painted silhouettes from the selected
flat study: helmet, linen shirt, single glove, trousers, single boot, coat, and
purple potion. The earlier classic set and visual comparisons remain under
`proposals/slot-art-v4/` and `proposals/slot-art-v5/`.
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
UI state images that share one canvas can use `trim: false` to preserve their
alignment and transparent margins. The active inbox rail uses a continuous
smoked-glass body at 44 × 148 CSS px and a separate translucent counter plate.
Clients rotate and resize the body to fit the launcher. Chat uses a speech
bubble, Tracker an eye, and Daily a calendar. Live counts cover the entire
icon; zero counts leave quiet grey icons visible, and generic unread chat
lights only the chat icon. Shared Tabler outline paths and their MIT license
are preserved under `third-party/tabler-icons/`. Earlier tile and clover art is retained.

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

## Adding and updating artwork

Put the master file in `sources/<group>/` and add a manifest entry with
`group`, `source` and `output`, for example
`new_resource: {group: 'resource', source: 'sources/resources/new-resource.png', output: 'new-resource'}`.
For an attribute, use `group: 'attribute'`, `name` and output `attributes/<name>`.
Per-size `sources` and `padding` work as described above. Update generated
artwork by replacing its master; never edit generated `assets/` files by hand.
Then run:

```sh
bun run build:artwork
bun run check:artwork
bun test
```

Review the three sizes on Admin's `/content/resources` stand. Commit both the source and
generated AVIFs with the cache. At release, publish an immutable package tag,
pin that same exact tag in Application and Admin, reinstall from GitHub and run
their required release checks. Both clients only copy ready-to-use assets.

### Existing artwork

Gold and Silver use dedicated, simpler `tiny` and matte `small` AVIFs; their approved
large coin artwork remains in the legacy `file` slot. For an existing legacy
entry, `file` can coexist with `sources` for the other size slots. Attribute Points
currently have only the flat cyan chevrons, so larger contexts use those until
a large version is chosen. Quest
Bounty has a silver bolt and Mining Points have a gold bolt; XP is text.
`personal_silver` and `space_silver` resolve to Silver, and
`lootbox_a` through `lootbox_f` resolve to their rarity artwork. The generic
`lootbox` has its own chest. `stamina` resolves to the Stamina attribute.
The six rarity chests have simplified, close-framed `tiny` variants for dense
tables; their approved full-size images remain the `large` variants.
Traits use their parent attribute marker.

The shared `help` UI symbol is the outlined question mark for contextual explanations. Render it through `visualFor('help', 'tiny')` so help controls keep the same shape across clients.

QFT, Experience, Chest Shards, Gems, and Attribute Points also have shared
markers. The current QFT image is provisional until its visual identity is
finalized. Chest Shards use the matte violet puzzle piece; the Weekly Reset
hourglass is a shared UI image. Moderation's double check, the rating star, and
the trophy used for Mining and Season are shared single-color UI symbols. `xp` and `chest_shards` are aliases
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
The Application's lootbox opening videos and other layout-specific graphics
remain local. The chat composer glass button is shared UI artwork. Welcome
reward markers use the same shared entries as other rewards; its panel
background and other decoration remain local.
The textless glass action button is shared UI artwork at
`/images/ui/glass-action-button-small.avif` for compact buttons. Its wide
variants keep a 128×38, 256×76, or 512×152 canvas; overlay the label in the
client so the image can be reused for other actions. UI artwork may declare
`dimensions` per variant to keep a non-square source's intended proportions.
The `reward_gift` marker is the small lavender isometric present used before
Daily rewards. Its transparent master and generation brief live in `sources/ui/`;
request its `tiny` variant for the 22 CSS px marker.
The Questfall shield logo is shared UI artwork as `questfall_logo`, with transparent
`tiny`, `small`, and `large` variants. Use `visualFor('questfall_logo', 'tiny')`
for compact role labels and other favicon-sized UI.
The simplified light pickaxe shield is available as `questfall_logo_badge` for
small role badges on dark glass surfaces.
The gold shield from the Admin favicon is available separately as
`questfall_logo_gold` in the same three sizes; it does not replace the purple logo.

To update generated artwork, replace its source and run `bun run build:artwork`.
For an existing legacy entry, change its active file until its master is
available for migration. Old tags remain available for open tabs and rollbacks.

### Gems F–A

`gem_f` through `gem_a` provide Common to Mythical Gem artwork. Generated glass
PNG masters in `sources/gems/` build transparent AVIF in all three standard sizes.
Inventory, Marketplace and weekly prize funds use the same rarity markers.

`gem_cracked_f` through `gem_cracked_a` are generated consumption illustrations
with a wide central fracture and two separated halves, using the same glass
material as intact Gems. Masters live in `sources/gems/cracked/`, including
the generation prompts. Use them for crafting ingredient costs, not owned items.

`dice_cracked_e` through `dice_cracked_a` illustrate the Dice consumed by perk
rerolling. Their two separated ceramic halves retain the rarity color and
2–6 pips. Masters live in `sources/dice/cracked/`. The matching intact Dice
visuals are active as `dice_e` through `dice_a` from `sources/dice/`.

The current 2.12.0 changes are a local working iteration. Application and Admin
use `file:../questfall-resource-art` while Fedor collects further changes. Before
the eventual release, publish an immutable artwork tag, pin that same exact tag
in both clients, reinstall from GitHub and rerun the required checks. No package
tag or application deployment was published for this iteration.

`consumables` is an original single-color supply-pouch SVG symbol for the combined
Potion/Gem/Dice inventory category. Render it through `resource-icon` / `visualFor`.

The `@questfall/resource-art/daily-actions` entrypoint exports `dailyActionMarkers`
and `dailyActionFor(action, variant)` for generated action icons. Request the
`small` variant for 54 CSS px task illustrations (40–48 px on narrow screens).
The active set uses broad silhouettes and one oversized action sign, without
weapons, hands, ornaments or small particles. Transparent masters and all built-in
image generation prompts live in `sources/ui/daily-actions-v2/`. The rejected
first study remains in `sources/ui/daily-actions-v1/`. Optimized 64/128/256 px
AVIF variants replace the existing `/images/ui/daily-actions-v1/` assets; both
Daily image components request `?v=2` to invalidate previously cached artwork.
Admin's `/content/resources` preview displays the main Daily sample at 54 px.
