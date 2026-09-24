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
symbol. Both clients render these paths through their local `rpg-attr-icon` tag.
Traits in the current Application UI use their parent attribute's symbol; they
do not have separate artwork. SVG styling and equipment-slot icons remain local.

`attributeCandidateImages` holds the current experimental raster set in
`proposals/attribute-images-v2/`; the first proposal remains in
`proposals/attribute-images-v1/`. The candidates follow the six existing
attribute silhouettes and are available for side-by-side preview in Admin.
They do not replace the active SVG attributes or the separate Mining Points
resource image.

To update a resource image, replace its file in `assets/` or add a new file and
catalog entry. Commit the change, tag a new version, update the exact Git tag in
both clients, run their checks, and release each client as needed. Keep older
versions available for rollbacks and open tabs on older client builds.

UI styling, aliases, and Admin-only metrics remain in the clients.
