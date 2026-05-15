# GBD Photography System

The product currently runs on Unsplash placeholders. Every image must be
replaced with commissioned GBD photography before public launch. This brief
governs every shoot.

## Visual contract

| Attribute | Rule |
|---|---|
| Mood | Cinematic. Premium. Confident. |
| Lighting | Hard directional key light, single source, soft fill. High contrast. No flat softboxes. |
| Background | Matte white seamless OR matte deep-charcoal stone. Nothing else. |
| Surface | Stone, brushed steel, charred wood — never glossy, never coloured. |
| Styling | Honest. Visible char. Visible texture. No glaze, no sprayed gloss, no fake garnish. |
| Crop | Top-down 90°, three-quarter 30°, or macro close-up. Never eye-level horizontal. |
| Colour grade | Warm-leaning neutral. Crush blacks. Lift mids. No teal-orange, no Instagram filters. |
| Negative space | At least 25% of frame is background. The food breathes. |

## Approved aspect ratios

Only two:

| Ratio | Use |
|---|---|
| `4/5` | Product cards, location cards, post cards, in-grid editorial. |
| `16/10` | Hero plates, feed lead images, lifestyle wides. |

Any other ratio is forbidden. The codebase enforces this via `<ImageBlock />`.

## Shot list per surface

**Hero (1 image, 16/10)** — flagship plate three-quarter, key light from upper
left, matte white seamless background. Single hero plate. No people.

**Product cards (1 per menu item, 4/5)** — top-down 90°, plate centred, stone
or matte-white background per category. Consistent plate diameter ±10%.

**Location cards (1 per store, 4/5)** — interior architectural detail OR
neighbourhood exterior. Empty. No staff, no customers. Editorial street style.

**Community (3 images, 4/5 + 16/10 lead)** — real customers, candid, mid-bite
or mid-laugh, available light only. No staged "happy people" stock energy.

**Catering (1 image, 4/5)** — spread of plates and sides, three-quarter
angle, suggests volume and abundance without becoming chaotic.

## Forbidden

- Sprayed gloss, food makeup, fake steam, fake melt
- Coloured backgrounds (red, navy, cream, anything off-brand)
- Lens flares, bokeh halos, motion blur
- Stock-photo composition: tilted plates, scattered ingredients, "rustic
  wood" backgrounds, decorative cutlery, herb sprinkles
- People mid-pose at camera
- Sunset / golden hour lighting on food
- Aerial drone shots of food

## Delivery spec

- Raw RAW + edited TIFF, 16-bit, ProPhoto RGB working space
- Web export: AVIF + WebP fallback, 90% quality, 1600px on long edge for
  hero, 1200px for cards
- File naming: `gbd-{surface}-{slug}-{ratio}.{ext}`
  e.g. `gbd-hero-spit-fired-plate-16x10.avif`

## Pre-shoot checklist (the photographer signs against this)

- [ ] Brief reviewed
- [ ] Lighting test against brand reference plates
- [ ] Background sample approved by brand director
- [ ] Plate / surface inventory matched to shot list
- [ ] Two backup talent options for community shots
- [ ] Shoot lookbook board approved 48h before shoot day
