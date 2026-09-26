# Tiny RPG category variants

The painted violet v2 illustrations still serve equipment placeholders and
larger contexts. At 24 px they lost their silhouette, so this set gives the
same seven categories dedicated tiny variants: one large object per cell,
simple purple color planes, a lavender contour, and a clear negative space.

`build-tiny.mjs` contains the editable SVG shapes and renders PNG masters to
`sources/slots/tiny/`. The artwork builder uses those masters only for the
`tiny` AVIF size. Marketplace and inventory filters request `slotTinyImages`;
equipment placeholders request `slotImages` from the same shared catalog.

`tiny-preview.png` shows the seven shapes at their 24 CSS px display size on
the dark Questfall UI background.
