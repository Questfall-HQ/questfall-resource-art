# Glass Gems F–A

Generated with the built-in imagegen tool on 29 September 2026. Fedor requested
richer, glass-like Gem artwork with the depth and lighting of Essence.

- Intact PNG masters: `gem-f.png` through `gem-a.png`.
- Consumption PNG masters: `cracked/gem-f.png` through `cracked/gem-a.png`.
- Palette F–A: silver-white, emerald green, sapphire blue, amethyst purple,
  golden yellow, rose pink.
- The emerald is the material/shape anchor. The other rarities are imagegen
  color edits of the same anchor, preserving facet geometry and light direction.
- The cracked emerald is an edit of the intact emerald; the other cracked
  rarities are color edits of that common split shape.
- Transparent alpha is retained. The standard artwork pipeline builds 64/128/256px
  AVIF variants; source PNGs are not shipped to clients.
- Previous flat artwork and wide-fracture masters are archived in
  `../../proposals/gems-flat-v1/`.

## Intact emerald prompt

Use case: style-transfer.
Asset: Questfall game inventory gemstone icon, premium polished 3D fantasy resource art.
Input image 1 is the STYLE reference only: Essence has deep translucent glass, luminous color within, smooth specular reflections, and precious magical depth. Input image 2 is ONLY a SHAPE reference: a single front-facing cut gemstone with a broad crown, angular shoulders and pointed bottom, roughly as tall as it is wide. Do NOT preserve its flat vector rendering.
Create ONE intact emerald-green gemstone. Make it look expensive, weighty and jewel-like: rich transparent emerald glass with deep forest-green recesses, brilliant mint highlights, a visible inner volume, physically convincing refraction through polished facets, subtle caustics and restrained internal luminous wisps. Broad readable facets with some fine bevel detail; sophisticated 3D painted game asset, not a flat illustration, not low-poly, not opaque plastic. Bright clean highlights and dark glass depth should coexist. Small bright highlights, NOT a blown-out white center. A hint of the Essence's internal light, but no prominent swirl that obscures the gemstone. Keep the elegant diamond silhouette recognizable at 20–40px.
Centered single object occupying about 82% of a square canvas, entire tip visible, symmetric frontal orientation, consistent studio light from upper-left. No pedestal, jewelry setting, ornament, scattered sparkles, text, badge, outline stroke or cast shadow. No background; real transparent alpha.

## Intact rarity variants

### F

Use case: precise-object-edit. Create the neutral silver-white diamond, subtle smoke-grey depth with cool white reflections. Avoid saturated blue color variant of this exact premium Questfall gemstone. Change ONLY the gemstone's color to neutral silver-white diamond, subtle smoke-grey depth with cool white reflections. Avoid saturated blue. Keep the exact diamond silhouette, front view, facet geometry, centered composition, realistic thick transparent glass, inner luminous refractions, polished bevels, highlight placement, and light direction. Preserve expensive 3D game resource look and clear facet contrast at small sizes. Keep the same size and framing. One INTACT gemstone. No cracks. No text, pedestal, jewelry setting, debris, external sparkles or cast shadow. Real transparent alpha background.

### D

Use case: precise-object-edit. Create the rich sapphire blue, deep cobalt shadows and icy blue highlights color variant of this exact premium Questfall gemstone. Change ONLY the gemstone's color to rich sapphire blue, deep cobalt shadows and icy blue highlights. Keep the exact diamond silhouette, front view, facet geometry, centered composition, realistic thick transparent glass, inner luminous refractions, polished bevels, highlight placement, and light direction. Preserve expensive 3D game resource look and clear facet contrast at small sizes. Keep the same size and framing. One INTACT gemstone. No cracks. No text, pedestal, jewelry setting, debris, external sparkles or cast shadow. Real transparent alpha background.

### C

Use case: precise-object-edit. Create the rich amethyst purple, deep violet shadows and lilac highlights color variant of this exact premium Questfall gemstone. Change ONLY the gemstone's color to rich amethyst purple, deep violet shadows and lilac highlights. Keep the exact diamond silhouette, front view, facet geometry, centered composition, realistic thick transparent glass, inner luminous refractions, polished bevels, highlight placement, and light direction. Preserve expensive 3D game resource look and clear facet contrast at small sizes. Keep the same size and framing. One INTACT gemstone. No cracks. No text, pedestal, jewelry setting, debris, external sparkles or cast shadow. Real transparent alpha background.

### B

Use case: precise-object-edit. Create the rich golden-yellow citrine, amber depth and champagne highlights. It is transparent glass, NOT opaque metal color variant of this exact premium Questfall gemstone. Change ONLY the gemstone's color to rich golden-yellow citrine, amber depth and champagne highlights. It is transparent glass, NOT opaque metal. Keep the exact diamond silhouette, front view, facet geometry, centered composition, realistic thick transparent glass, inner luminous refractions, polished bevels, highlight placement, and light direction. Preserve expensive 3D game resource look and clear facet contrast at small sizes. Keep the same size and framing. One INTACT gemstone. No cracks. No text, pedestal, jewelry setting, debris, external sparkles or cast shadow. Real transparent alpha background.

### A

Use case: precise-object-edit. Create the rich rose-pink tourmaline, deep magenta shadows and pale pink highlights. Clearly pink, not purple color variant of this exact premium Questfall gemstone. Change ONLY the gemstone's color to rich rose-pink tourmaline, deep magenta shadows and pale pink highlights. Clearly pink, not purple. Keep the exact diamond silhouette, front view, facet geometry, centered composition, realistic thick transparent glass, inner luminous refractions, polished bevels, highlight placement, and light direction. Preserve expensive 3D game resource look and clear facet contrast at small sizes. Keep the same size and framing. One INTACT gemstone. No cracks. No text, pedestal, jewelry setting, debris, external sparkles or cast shadow. Real transparent alpha background.

## Cracked emerald prompt

This was the initial glass fracture. The active cracked masters subsequently
received a wider separation edit because internal reflections hid the narrow
gap at icon size. See `cracked/README.md` for the current edit and color prompts;
the first glass fracture is archived in `../../proposals/gems-glass-fracture-v1/`.

Use case: precise-object-edit. Asset: consumed version of this exact Questfall gemstone, displayed at 20–40px. Split this premium emerald glass gemstone into exactly TWO large matching halves with a single jagged vertical break. Slide the halves apart and tilt each slightly outward by about 5 degrees; leave a very clear transparent zigzag gap 15–18% of the full gem width, open all the way through including the bottom. The halves MUST NOT TOUCH. Show the thickness of glass on the broken inner faces. Preserve the emerald color, original exterior facets, deep transparency, inner refracted light, brilliant polished glass and expensive 3D material. Preserve a recognizable diamond shape overall. No tiny fragments, no dust, no extra cracks, no explosion, no external sparks. Entire pair centered inside square canvas with outer margin, same frontal lighting and visual weight as the intact original. No text or shadow, real transparent alpha.

Other cracked colors use the same color palette and preserve the exact wide
fracture; their full prompts are recorded in `cracked/README.md`.
