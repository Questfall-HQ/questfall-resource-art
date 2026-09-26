# RPG slot art exploration

Three generated transparent sheets use the same order: head, chest, hands,
legs on the first row; feet, outer, potion on the second. The last cell is empty.

- `painted.png` — warm, hand-painted storybook fantasy.
- `soft-3d.png` — rounded, matte 3D cartoon objects with teal cloth, brown
  leather and brass details. This was the first active direction.
- `cel-shaded.png` — bold 2D ink contours and broad highlights.

All prompts asked for seven separate fantasy objects in a four-column,
two-row grid, a real transparent background, no labels or frames, and clear
silhouettes at 24 CSS pixels. The objects are a hood, tunic, gloves, trousers,
boots, cloak and amber potion bottle. The three style descriptions above were
the variant-specific prompt differences.

`extract.mjs` reproduces the first masters from `soft-3d.png`. The active
artwork now comes from `proposals/slot-art-v2/`.
