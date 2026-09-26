# RPG category art refinement

The first shared set was too dimensional and detailed for filter buttons. Two
transparent sheets explore simpler illustrations with clear silhouettes and
enough form to work in larger equipment placeholders:

- `painted-simplified.png`: restrained painterly rendering.
- `broad-planes.png`: stronger 2D color masses and fewer small details, first
  explored in teal and brown.
- `broad-planes-violet.png`: the same readable forms in Questfall's dark violet,
  plum, and lavender palette, with a violet potion. Active.

Each sheet uses the same seven-category layout as v1. The `*-24px.png` and
`*-80px.png` contact sheets show the extracted objects on a dark UI background.
Run `bun proposals/slot-art-v2/prepare.mjs broad-planes-violet --masters` to update
`sources/slots/`, then `bun run build:artwork` for the three AVIF sizes. The
earlier sheet and its masters remain available in `slot-art-v1` and Git tag
`v2.10.0`.
