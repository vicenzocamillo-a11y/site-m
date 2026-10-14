---
name: Anelise Werle Camillo, Terapeuta Quântica
description: A Brazilian santinho on an ultramarine mantle; gold resplendor, die-cut lace card stock, engraved capitals.
colors:
  manto: "#0E2269"
  manto-fundo: "#0A1950"
  manto-claro: "#1A2F86"
  ouro: "#D9B25F"
  ouro-claro: "#F0D58F"
  ouro-escuro: "#8F6D25"
  papel: "#F6ECDD"
  papel-sombra: "#EADAC2"
  placa-rosada: "#F1C9C0"
  rosa: "#E8A0A6"
  rosa-tinta: "#9E3F4C"
  tinta: "#1C2357"
  tinta-suave: "#3A3F6B"
  leite: "#EFE6D6"
  leite-suave: "#BFC6E8"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(2.7rem, 1.2rem + 5.4vw, 5.9rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(2rem, 1.2rem + 2.8vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.01em"
  title:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "1.4rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.015em"
  wordmark:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(1.05rem, 0.9rem + 0.6vw, 1.45rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.04em"
  lead:
    fontFamily: "Alegreya, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.15rem, 1rem + 0.45vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Alegreya, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.06rem, 0.98rem + 0.3vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
  prayer:
    fontFamily: "Alegreya, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.12rem, 0.95rem + 0.8vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Alegreya, Iowan Old Style, Georgia, serif"
    fontSize: "1.05rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.01em"
  small:
    fontFamily: "Alegreya, Iowan Old Style, Georgia, serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  hairline: "2px"
  pill: "999px"
  round: "50%"
spacing:
  gutter: "clamp(1rem, 5vw, 5rem)"
  section: "clamp(5rem, 11vw, 9rem)"
  block: "clamp(3rem, 6vw, 4.5rem)"
  stack: "1.2rem"
  inline: "0.7rem"
components:
  button-gold:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.45rem 0.45rem 1.4rem"
    height: "3.1rem"
  button-gold-large:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.45rem 0.45rem 1.7rem"
  button-whatsapp-float:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.round}"
    size: "3.6rem"
  select-session:
    backgroundColor: "transparent"
    textColor: "{colors.leite}"
    rounded: "{rounded.hairline}"
    padding: "0.7rem 2.4rem 0.7rem 0.9rem"
    height: "3.1rem"
  booking-strip:
    backgroundColor: "{colors.manto-fundo}"
    padding: "1rem 1.1rem 1.05rem"
  nav-link:
    textColor: "{colors.leite}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.ouro-claro}"
  card-session:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    padding: "1.1rem 1.15rem 1.4rem"
    width: "21rem"
  card-link:
    textColor: "{colors.rosa-tinta}"
  cartouche:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    padding: "0.3rem 1.3rem 0.35rem"
  step-medallion:
    textColor: "{colors.rosa-tinta}"
    rounded: "{rounded.round}"
    size: "3rem"
  menu-button-mobile:
    textColor: "{colors.leite}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.95rem"
---

# Design System: Anelise Werle Camillo, Terapeuta Quântica

## Overview

**Creative North Star: "Santinho de Luz"**

The whole site is a Brazilian santinho, the devotional holy card kept in a wallet, laid on a deep ultramarine mantle. The mantle is the page; everything the visitor reads up close (sessions, how it works, contact, the back of the hero card) is printed on cream card stock with a die-cut lace edge. Gold is the resplendor: rays behind the figure, double filetes around frames, the one pill-shaped action. Rose is the chromolithograph ink on the card stock. The figure on the card is a Dragão de Luz, and its ornaments are suns and four-point stars, never crosses.

Density is low and ceremonial. Headlines are engraved Didone capitals; running text is a warm humanist book face that reads like a prayer card's verso. Depth comes from paper physically lifted off the mantle (soft drop shadows under the lace) and from a single 3D gesture: the hero santinho turns over as you scroll. The site explicitly refuses the category default of a lilac galaxy hero over a row of service cards.

**Key Characteristics:**
- Ultramarine mantle ground; cream card stock only inside a lace (renda) frame.
- Gold for rays, filetes, wordmark title and the single primary action.
- Bodoni Moda uppercase for display and headings; Alegreya for everything read.
- Ornament vocabulary: four-point star, sun, double hairline filete, scalloped lace, conic ray burst.
- One signature motion: the santinho flips on scroll (rotateY); everything else eases on one curve.

## Colors

A two-ground palette: ultramarine for the mantle, cream for card stock, with gold and rose as the only inks.

### Primary
- **Manto Ultramarine** (`manto`): the page ground, the hero, the "como funciona" section surround, `theme-color`. Its deeper step **Manto Fundo** (`manto-fundo`) closes sections (sessions gradient end, Dragões band, footer, booking-strip fill at 55%, mobile menu overlay at 97%); **Manto Claro** (`manto-claro`) lights only the centre of the portrait medallion.

### Secondary
- **Resplendor Gold** (`ouro`): filetes, frame lines (at 30-70% alpha), the star separators in the nav, the FAQ star toggles, the select chevron, the gold pill's mid-stop.
- **Pale Gold** (`ouro-claro`): display and section headings on the mantle, focus rings, the ray burst, hover text, the "Virar o santinho" link.
- **Engraver's Gold** (`ouro-escuro`): gold read on paper: the hairline around the card stock, the cartouche double border, sun ornaments on cream, the scrollbar thumb.

### Tertiary
- **Chromolithograph Rose** (`rosa`): on the mantle only, small: the element stars in the Dragões list and the placeholder mark.
- **Rose Ink** (`rosa-tinta`): rose on paper: card links, step numerals and their ring, the prayer signature and its fading rule, the Instagram link.
- **Blush Plate** (`placa-rosada`): the background plate behind the santinho art and card art (radial from `#FBEADF` to this value), matching the blush-peach of the chromolithograph paintings.

### Neutral
- **Card Stock** (`papel`) and its shaded edge **Papel Sombra** (`papel-sombra`): the only light surface. Backs (verso, contact) use a radial from `#FBF3E8` through `papel` to `papel-sombra`.
- **Ink** (`tinta`): headings and text on paper; text on the gold pill; the selection text.
- **Soft Ink** (`tinta-suave`): body copy on paper.
- **Milk** (`leite`): body text and wordmark on the mantle.
- **Soft Milk** (`leite-suave`): secondary copy on the mantle (section intros, notes, FAQ answers, footer).

### Named Rules
**The Two Grounds Rule.** Text sits on either ultramarine or card stock, nothing else. On the mantle use `leite`/`leite-suave` with `ouro-claro` headings; on paper use `tinta`/`tinta-suave` with `rosa-tinta` accents. Paper never appears without its lace frame or gold hairline.

**The Inked Gold Rule.** Bright gold (`ouro`, `ouro-claro`) belongs to the mantle; on cream, gold drops to `ouro-escuro` and rose drops to `rosa-tinta`. Swap the ink, never lower the contrast.

## Typography

**Display Font:** Bodoni Moda variable, self-hosted (with Didot, Bodoni 72, Georgia)
**Body Font:** Alegreya variable, roman and italic, self-hosted (with Iowan Old Style, Georgia)

**Character:** A high-contrast engraved roman set in capitals, like the lettering on a devotional print, over a calligraphic humanist text face that keeps long reading warm rather than clinical.

### Hierarchy
- **Display** (Bodoni 500, uppercase, optical sizing auto): the hero line only, in `ouro-claro` with a soft dark text shadow.
- **Headline** (Bodoni 600, uppercase): every section `h2`; `ouro-claro` on the mantle, `tinta` on paper.
- **Title** (Bodoni 600, mixed case, 1.4rem on session cards; 1.2rem / 1.25 on steps): names on card stock.
- **Wordmark** (Bodoni uppercase, 0.04em): the header name and footer name (1.2rem, 0.05em); the subtitle under it is Alegreya 0.95rem in `ouro`.
- **Lead** (Alegreya 400): the hero paragraph and the Dragões text, max about 31-38rem.
- **Body** (Alegreya 400, 1.6): all running text; measure 36-44rem.
- **Prayer** (Alegreya italic): the manifesto on the card's back, max 17em, between two fading rose hairlines.
- **Label** (Alegreya 650): button and card-link text; FAQ questions at 600.
- **Small** (Alegreya 0.92-0.98rem): notes, disclaimer, footer, support line.

### Named Rules
**The Engraved Caps Rule.** Bodoni is set in uppercase for display, headings, wordmark and the mobile menu; it goes mixed case only for names printed on card stock (card titles, steps, cartouche, element list).

**The Book Face Rule.** Anything longer than a name is Alegreya. No sans-serif exists in this system.

## Layout

A single centred column with generous ceremony. The page gutter is `spacing.gutter`; sections breathe on `spacing.section` vertical padding (FAQ and contact slightly tighter). Content measures cap at 36-44rem for text, 62rem for the paper "como funciona" sheet, 72-74rem for the card fan and the about split.

- **Hero:** full-viewport grid, text column (1.05fr) beside the santinho scene (0.95fr), framed by an inset double gold filete with star corners. Santinho width is `min(30rem, 74%, 70svh at 1100/1640)`.
- **Sessions:** three lace cards fanned like a hand of santinhos (outer cards rotated ±3deg and dropped 1.6rem, centre raised); hover or focus straightens and lifts the card.
- **About:** 0.8fr / 1.2fr split, oval medallion left.
- **Steps:** two-column grid of numbered steps on one lace sheet.
- **Breakpoints:** at 860px the hero stacks, the nav becomes a full-screen overlay, the card fan becomes a horizontal scroll-snap rail (cards `min(19rem, 80vw)`, unrotated), and grids go single-column. At 480px the gold pill goes full width.
- **Reduced motion:** the santinho shows front and back side by side, still; the flip control is hidden.

## Elevation & Depth

Depth is physical paper over cloth: soft, dark-navy ambient shadows under objects that are cut out (lace cards, the pill, the medallion, the floating button), and stacked inset hairlines to read as printed filetes. There are no hard offset shadows and no glows.

### Shadow Vocabulary
- **Lace lift** (`filter: drop-shadow(0 26px 30px rgba(2,6,30,.55))`; `0 30px 40px` on the steps sheet): every lace-framed card; drop-shadow so the scallops cast.
- **Pill lift** (`0 14px 28px -14px rgba(2,6,30,.8)` plus inset top highlight and bottom bevel): the gold button and floating button.
- **Medallion** (`0 30px 50px -20px rgba(2,6,30,.8)` behind two ring shadows): the portrait oval.
- **Cartouche** (`0 6px 14px -8px rgba(60,30,10,.5)`): the name plate on the santinho.

### Named Rules
**The Double Filete Rule.** Frames are drawn as a 1px gold line plus a second, fainter 1px line inset by 3-5px (box-shadow `inset 0 0 0 Npx <ground>, inset 0 0 0 N+1px <gold at ~.35>`), or a `3px double` border on small plates. Single heavy borders are not part of this world.

## Shapes

Mostly square paper with ornamental edges. Corners are sharp on cards, sheets, the booking strip and the select (`rounded.hairline` at most); roundness is reserved for the gold pill and the mobile menu button (`rounded.pill`) and for circular things (`rounded.round`): step medallions, the icon well inside the pill, the floating button, the portrait oval. The scalloped, pin-pricked lace edge (`assets/renda.svg` as a `border-image`, 16 slice, `round`, 17-22px wide) is the signature silhouette. The conic ray burst (`repeating-conic-gradient` masked radially) sits behind the santinho and the medallion. Ornaments are the four-point star (also used as a CSS mask) and the eight-ray sun.

## Components

### Buttons
Polished gold, like gilt on a card edge.
- **Shape:** full pill (`rounded.pill`), min height 3.1rem.
- **Primary (gold pill):** vertical gradient `#F6DFA0` to `ouro` (55%) to `#C79D47`, `tinta` text at weight 650, text left and a round icon well (2.3rem, `tinta` at 12%) holding the WhatsApp mark on the right.
- **Hover / Active:** brightness 1.05, deeper shadow, icon nudges right; active scales to 0.98. Focus is the global 2px `ouro-claro` outline, offset 3px (`tinta` on paper).
- **Large:** 1.15rem text, 1.7rem left padding (contact card).
- **Text action:** underlined links with a 1px offset underline (`rosa-tinta` on paper, `ouro-claro` at 45% on the mantle, solid on hover).

### Booking strip
A gold-framed panel (1px gold at 70% plus an outline at 35%, 4px offset) on 55% `manto-fundo`, holding a label, the session select and the gold pill on one wrapping row, with a small note under it.

### Inputs / Fields
- **Style:** transparent select, 1px gold border at 60%, `rounded.hairline`, CSS chevron in `ouro`.
- **Hover:** border goes to `ouro-claro`. Options render `tinta` on `papel`.

### Navigation
Wordmark left, six text links right separated by small gold stars; hover draws a 1px gold underline from the left and turns text `ouro-claro`. Below 860px: a pill "Menu" button with two-line icon that crosses to an X; a 97% `manto-fundo` overlay lists links in uppercase Bodoni `ouro-claro`, staggered in by 50ms. Escape and focus-out close it.

### Cards / Containers
- **Corner Style:** square, inside the lace border-image.
- **Background:** `papel`, 1px `ouro-escuro` hairline plus inset second filete.
- **Shadow Strategy:** lace lift.
- **Internal Padding:** 1.1rem 1.15rem 1.4rem on session cards; clamp(2rem, 5vw, 3.8rem) on sheets.
- **Session card content:** 4:3 art plate on blush, mixed-case Bodoni title, `tinta-suave` text, format line, rose-ink underlined booking link.

### Santinho (signature)
A portrait card (1100:1640) with lace edge: front is the chromolithograph art plate with a cartouche naming the figure; back is the prayer on a cream radial with a sun above and rose-ink signature below. It enters with a 1.4s rise, rays breathe twice (2.5s alternate) then rest, and it turns from -14deg to 180deg as the hero scrolls out (scroll-driven `--giro`), or on the "Virar o santinho" control (1.2s on `--suave`).

### FAQ
Native `details` between gold hairlines at 40%; question in Alegreya 600 `leite`, a gold star toggle that rotates 45deg when open; answers in `leite-suave`.

### Placeholder mark
Unconfirmed content stays visibly marked: rose text on 14% rose fill with a 1px dashed outline (rose-ink on paper). It is a content-state marker, removed when the fact is confirmed.

## Do's and Don'ts

### Do:
- **Do** put every light surface inside the lace frame or a double gold filete; cream never floats bare on the mantle.
- **Do** keep gold the only action colour: one gold pill per view, plus the floating WhatsApp button once the booking strip has scrolled away.
- **Do** set headings in uppercase Bodoni Moda and everything read in Alegreya, both self-hosted.
- **Do** use the four-point star and the sun as the ornament set (separators, list bullets, toggles, corners).
- **Do** ease every transition on `cubic-bezier(0.22, 1, 0.36, 1)` and give reduced-motion users the still, side-by-side santinho.
- **Do** swap to `ouro-escuro` and `rosa-tinta` when gold or rose sits on cream.

### Don't:
- **Don't** use crosses or confessional iconography; the ornaments are suns and stars (the practice requires no religion).
- **Don't** fall back to the category default of a lilac galaxy hero over a row of identical service cards.
- **Don't** introduce a sans-serif, a system display face, or a second display family.
- **Don't** use hard offset shadows, glows, or rounded-corner cards; depth is lifted paper.
- **Don't** add new inks beyond ultramarine, gold, rose and cream.
