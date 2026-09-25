# Questfall Resource Art

Shared artwork for resource, lootbox, and RPG attribute markers in Questfall
Application and Admin. The four AVIF resource images, six rarity-specific WebP
lootbox images, and SVG attribute geometry came from `questfall-application`.
The generic lootbox image is the closed chest from the third Welcome quest,
"Buy a Common Lootbox".

`catalog.js` maps canonical resource and lootbox keys to public paths. Each client
imports `resourceImages` and `lootboxImages` for its own UI and runs
`bun node_modules/@questfall/resource-art/bin/sync.mjs` before compiling. The
sync command copies the catalogued files to `public/images/resources` and
`public/images/lootboxes`. Opening videos remain in Application.

`lootboxImages.generic` is the marker for lootboxes without a specified rarity.
The other entries remain the artwork for individual rarity levels.

`attributeIcons` contains the six attribute symbols plus the generic `boost`
symbol. Admin still renders the six SVG symbols; Application uses the raster
set below for those attributes and keeps the SVG `boost` symbol. Traits in
Application use their parent attribute's image and do not have separate
artwork. SVG styling and equipment-slot icons remain local.

`attributeCandidateImages` holds the current raster set: Trading, Stamina, and
Luck from `proposals/attribute-images-v2/`, refined Mining and Crafting from
`proposals/attribute-images-v3/`, and the Inventory backpack from
`proposals/inventory-options-v1/`. Application uses these six images through
its shared attribute icon component. The separate Mining Points image remains
the gold lightning resource. `inventoryVariantImages` lists the active backpack
and three other Inventory silhouettes, including the original cube. Admin
shows all four together for comparison. Earlier proposals remain available.

`uiCandidateImages` contains four Submissions concepts for the Author Space and
quest submission UI: an inbox, a completed form, photo proof, and a paper plane
for sending. Admin's resource preview shows them at card and small UI sizes.
Application and Admin still use their current icons until one is selected.

To update a resource image, replace its file in `assets/` or add a new file and
catalog entry. Commit the change, tag a new version, update the exact Git tag in
both clients, run their checks, and release each client as needed. Keep older
versions available for rollbacks and open tabs on older client builds.

UI styling, aliases, and Admin-only metrics remain in the clients.
