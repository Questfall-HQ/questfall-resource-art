# Slot artwork: classic set

This set restores the six equipment objects from the original Application art.
`reference/large/*.avif` came from `questfall-application/public/images/rpg/slots/`;
`reference/tiny/*.avif` came from its `icons/` directory. Their previous
per-slot brightness, contrast, opacity, and scale settings live in
`questfall-application/src/rpg/catalog.imba`.

The potion was generated as a transparent image using the old six-object
contact sheet as a visual reference. The prompt requested a broad silhouette,
amethyst liquid, neutral glass and cork, and restrained detail to match the
existing art at 24 px. `potion-original.png` is the untouched result.

Run `bun proposals/slot-art-v4/prepare.mjs` from the package root to recreate
the active PNG sources and the 24/80 px contact sheets. The package build then
produces the three AVIF sizes under `assets/slots/v4/`.
