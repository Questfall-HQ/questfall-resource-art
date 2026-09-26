# RPG slot artwork studies

The flat study was selected for the active artwork. Its vest was replaced by a
separately generated tan-brown linen shirt with sleeves; `raw/flat-shirt-v3.png`
is the selected transparent result. `raw/flat-shirt.png` is the first, overly
wide draft; `raw/flat-shirt-v2.png` corrected its proportions but was too pale.
The earlier material and simplified studies stay
available for comparison.
The seven objects are ordered `head, chest, hands, legs, feet, outer, potion`.
All three transparent sheets were produced with the built-in Image Gen tool.
The first used `../slot-art-v4/classic-80px.png` as a style and palette reference;
each following study used the previous generated sheet as its edit target.

| Study | Goal | Outcome at 24 px |
| --- | --- | --- |
| `material` | Preserve the original leather, cloth and iron feeling; clarify each silhouette. | Glove and trousers are still dark. |
| `simplified` | Remove chainmail, stitches and folds; brighten large shapes. | Best balance of readable shapes and painted volume. |
| `flat` | Further reduce shading to broad planes. | Clearest shapes, but more graphic than the existing set. |

Prompt progression:

1. **Material:** “Use the current seven-object set as palette and material
   reference. Draw exactly one open-faced helmet, sleeveless vest, single
   five-finger glove, trousers, single side-view boot, open-front coat, and
   purple potion in a transparent 4 × 2 sheet. Preserve warm matte fantasy
   materials while clarifying broad light and dark regions for 24 px.”
2. **Simplified:** “Keep the seven objects, order, transparency and palette.
   Remove chainmail, rivets, thin stitching, cloth microtexture and wrinkles.
   Brighten the glove and trousers; make each silhouette readable at 24 px.”
3. **Flat:** “Keep the same seven objects and layout. Reduce smooth rendering
   to two or three large highlight and shadow regions per object. Preserve
   painted volume at 80 px, with clean silhouettes for 24 px and no outlines.”

4. **Shirt:** “Use the flat vest as a style and brightness reference, but draw
   one cream linen shirt with clearly visible sleeves and cuffs, a modest V
   neckline, straight hem and a broad T silhouette, isolated on transparent
   pixels. Avoid a vest, coat, armor, person and micro-detail.”
5. **Shirt refinement:** “Keep the cream linen shirt and its flat painted
   style. Angle the sleeves closer to the torso and lengthen the body so its
   silhouette is about 1.2 times wider than tall inside a square filter.”
6. **Shirt color:** “Keep the refined shirt silhouette exactly. Recolor pale
   cream into warm medium tan-brown linen, matching the flat trousers and boot
   in overall brightness while preserving the collar and sleeve contrast.”

Each prompt also excluded pairs of gloves or boots, backgrounds, text, frames,
neon colors and glossy 3D styling. The generated PNGs are in `raw/`. Run
`bun proposals/slot-art-v5/prepare.mjs` from the package root to extract the
individual transparent crops under `items/` and rebuild `comparison-24px.png`
and `comparison-80px.png`. The contact sheets use unfiltered art on a dark
background.
