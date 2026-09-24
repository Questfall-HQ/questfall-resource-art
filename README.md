# Questfall Resource Art

Shared artwork for resource, lootbox, and RPG attribute markers in Questfall
Application and Admin. The four AVIF resource images, six WebP lootbox images,
and SVG attribute geometry came from `questfall-application`.

`catalog.js` maps canonical resource and lootbox keys to public paths. Each client
imports `resourceImages` and `lootboxImages` for its own UI and runs
`bun node_modules/@questfall/resource-art/bin/sync.mjs` before compiling. The
sync command copies the catalogued files to `public/images/resources` and
`public/images/lootboxes`. Opening videos remain in Application.

`lootboxIcon` is the generic Box Open symbol used by Application when the
lootbox rarity is unspecified. Both clients render this SVG geometry directly.
The symbol comes from Font Awesome Free 7.2.0; its attribution and license are
in `third-party/fontawesome-free/LICENSE.txt`.

`attributeIcons` contains the six attribute symbols plus the generic `boost`
symbol. Both clients render these paths through their local `rpg-attr-icon` tag.
Traits in the current Application UI use their parent attribute's symbol; they
do not have separate artwork. SVG styling and equipment-slot icons remain local.

To update a resource image, replace its file in `assets/` or add a new file and
catalog entry. Commit the change, tag a new version, update the exact Git tag in
both clients, run their checks, and release each client as needed. Keep older
versions available for rollbacks and open tabs on older client builds.

UI styling, aliases, and Admin-only metrics remain in the clients.
