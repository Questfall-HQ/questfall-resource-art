# Questfall Resource Art

Shared artwork for resource and RPG attribute markers in Questfall Application
and Admin. The four initial AVIF files and the SVG attribute geometry were
copied from `questfall-application`.

`catalog.js` maps canonical resource keys to public paths. Each client imports
`resourceImages` for its own `resource-icon` component and runs
`bun node_modules/@questfall/resource-art/bin/sync.mjs` before compiling. The
sync command copies the catalogued files to `public/images/resources`.

`attributeIcons` contains the six attribute symbols plus the generic `boost`
symbol. Both clients render these paths through their local `rpg-attr-icon` tag.
Traits in the current Application UI use their parent attribute's symbol; they
do not have separate artwork. SVG styling and equipment-slot icons remain local.

To update a resource image, replace its file in `assets/` or add a new file and
catalog entry. Commit the change, tag a new version, update the exact Git tag in
both clients, run their checks, and release each client as needed. Keep older
versions available for rollbacks and open tabs on older client builds.

UI styling, aliases, and Admin-only metrics remain in the clients.
