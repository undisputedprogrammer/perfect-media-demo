# Perfect Media Qatar — first design concept

A local, responsive landing page in **HTML + compiled Tailwind CSS + vanilla JavaScript**. No framework, external runtime, CDN dependency, or backend is required.

## Brand refinement

### Current hero: Anything but ordinary

The opening has been redesigned as a full-width dark editorial poster, replacing the original text/image split. Giant centered typography, two independently floating transparent product cutouts, a circular project CTA, and a dark-to-light header transition create a different visual structure from the supplied competitor reference. The intro, trailing cursor, and all catalog/quote interactions remain in place. The hero adapts its composition for phones; 320px and 390px layouts, the quote CTA, motion pause, and the header theme transition were verified in-browser.

Current hero assets are `assets/hero-cup.webp` and `assets/hero-bag.webp`, with original transparent PNGs alongside them. Both were created using the built-in image-generation tool, editing `assets/hero-brand-red.png`. Final prompts:

> Precise product extraction edit. Isolate ONLY the red paper takeaway coffee cup with black lid from the bottom left of this reference. Preserve its exact Perfect Media calligraphic logo and typography, vivid red #ED1C24 paper texture, and three-quarter camera angle. Remove every other product and background entirely. One beautiful floating cup, centered with generous transparent margins, complete object including lid and base fully visible, roughly upright with a gentle 10 degree tilt. High end sharp studio product photography, soft edge lighting appropriate for a near-black website. Genuine transparent alpha background. No floor, no cast floor shadow, no text outside the object. Square output.

> Precise product extraction edit. Isolate ONLY the tall white luxury paper shopping bag with red ribbon handles from this reference. Preserve the exact Perfect Media red and grey calligraphic logo and bilingual typography, embossed paper details, porcelain white material and scarlet #ED1C24 ribbon handles. Remove every other product and background entirely. One beautiful floating bag centered with generous transparent margins, complete bag and handles fully visible, three-quarter angled view with gentle 8 degree lean. High end sharp studio product photography, soft edge lighting appropriate for a near-black website. Genuine transparent alpha background. No floor, no cast floor shadow, no text outside the object. Square output.

### Logo, palette, and motion system

The supplied logo is preserved unchanged at `assets/perfect-media-logo.png`; CSS framing removes its transparent margins for the header, footer, and introduction. Primary brand colors sampled from that image are **#ED1C24** (red) and **#7B7C7F** (grey), paired with porcelain and charcoal. Inter Tight and Instrument Serif replace the original display typography; DM Sans remains the reading face. All fonts are self-hosted with their licenses.

`premium.css` and `premium.js` implement the refined typography and interactions:

- Asset-aware branded introduction, skip/Escape controls, curtain exit, and a hard timeout. Reduced-motion visitors bypass it; without JavaScript the overlay is never shown.
- Staggered heading reveals, service-image transitions, magnetic buttons, and subtle hero tilt and floating motion.
- A double-ring cursor with three easing trail points and contextual product/project labels. It activates only for a fine mouse pointer, disappears for keyboard/touch use and native dialogs, and stops when motion is paused. Its animation loop sleeps once movement settles.
- Red-and-white packaging concept retained at `assets/hero-brand-red.webp`, with its full-resolution source at `assets/hero-brand-red.png`; this image is the reference for the current transparent cutouts.

The revised hero was created with the built-in image-generation tool, using the original hero as the edit target and the supplied logo as the branding reference. Prompt:

> Edit the first image: retain the beautiful premium paper bag, two cups, gift box and business card floating still life, same three-quarter product photography composition. The SECOND image is the official Perfect Media Qatar brand logo reference: use that red-and-grey calligraphic emblem and PERFECT MEDIA English wordmark on the bag, cups and gift box instead of ALL the old lowercase perfect branding and asterisks. Crucial palette change: ALL orange materials and handles must become true vivid brand red #ED1C24, all beige/cream products become cool porcelain white #F6F5F3, and background becomes seamless cool very light grey #F3F3F3. Keep dark charcoal cup lid and charcoal business card. No orange, no ochre, no beige tones. High end luxury editorial product photography with crisp soft studio side lighting, subtle paper grain and embossing, beautiful natural contact shadows. Professional restrained branding at realistic size, actual logo reference reproduced accurately, not another invented logo. Clean 3:2 landscape framing, no added text outside products, no website/UI. Keep every product comfortably within frame.

Verified in-browser: intro auto-completion and skip, 320px and 390px layouts without horizontal overflow, desktop layout, pause-motion fallback, product configuration, quote review, and project filtering. No console errors were observed. The hero is a visual concept, not an actual product photograph.

## Preview

### Vercel deployment

Use **Other** as the framework preset. The committed `vercel.json` sets the build command to `npm run build`, the install command to `npm install`, and the output directory to `dist`. Set the project root to the directory containing `package.json` and `vercel.json`. The build compiles Tailwind and packages the static site in `dist/`; no server start command is needed. Commit and push the configuration and packaging script, then deploy the new commit. The former root-output (`.`) instructions are superseded by this configuration.

```sh
npm install
npm run build
npm run dev
```

Open http://127.0.0.1:4173. The compiled stylesheet is included, so you can also open `index.html` directly. Use `npm run watch:css` while changing styles, and `npm run check` for JavaScript syntax checks.

## Files

- `index.html`: page structure and static copy.
- `input.css`: Tailwind entry point, theme, components, motion, responsive rules.
- `styles.css`: compiled, minified CSS.
- `app.js`: catalog data, interactions, dialogs, navigation, scroll reveals, counters, and quote preparation.
- `assets/`: local imagery, fonts, and favicon. WebP images are used on the page; source images are retained.
- `server.cjs`: local-only preview server bound to 127.0.0.1.

## Working interactions

- Six service accordions with corresponding imagery and quote selection.
- Seven products, category filtering, horizontal navigation, and size/quantity configuration.
- Eleven project previews with seven category filters and expandable project gallery.
- Product/project selection prefills the quote form.
- Native form validation and a review dialog that constructs a WhatsApp message. The visitor must click through to WhatsApp and send it; no request is submitted or stored by this page.
- Real phone, email, social, map, and WhatsApp links from the reference.
- Mobile navigation, keyboard-operable dialogs, focus return, skip navigation, reduced-motion support, and a pause-animation control.

## Content and design notes

The supplied reference is https://perfect-media-qatar-c6201507.base44.app/. Service descriptions, catalog, project names/images, company information, process, industries, contact details, and metrics are based on that page. Editorial headlines are rewritten for this design concept. Metrics and business claims are inherited from the reference, not independently verified. The contact email `info@perfectmediqa.com` is intentionally preserved as shown there.

The original ivory/orange concept has been superseded by the supplied red/grey brand logo and the refinement above. The hero is a generated concept mockup, not a photograph of delivered client work. Catalog and portfolio artwork is retained from the reference (many original filenames identify it as generated imagery). Confirm portfolio asset rights before a public launch.

This first output is a front-end prototype. It does not upload files, take payments, save submissions, or send messages automatically. The reference upload field is represented by a design-link field, with file attachment handled directly in WhatsApp.

## Original hero artwork (retained source)

Created with the built-in image generation tool; source: `assets/hero-packaging.png`, original optimized asset: `assets/hero-packaging.webp`. These files are retained for reference; the page now uses `assets/hero-brand-red.webp`.

Prompt:

> Use case: product-mockup. Asset: luxury printing and branding studio website hero, landscape 3:2 composition. Create a spectacular photorealistic art-directed still life of custom paper packaging: a large warm ivory shopping bag with burnt-orange ribbon handles standing behind, a matte orange takeaway coffee cup with black lid tilted slightly in foreground, an ivory cylindrical coffee cup, an orange rigid gift box, and a black business card. The objects are dynamically arranged, some slightly levitating above a seamless warm pale beige studio floor, elegant natural soft shadows. Paper texture, tactile embossed print, high-end design magazine product photography. Brand typography on bag: 'perfect' small black lower case modern sans serif with a tiny orange asterisk, below 'MADE TO STAND OUT.' Cup has cream large modern asterisk and small 'perfect media' type, gift box minimal oversized cream linework asterisk. Restrained palette: ivory #f5f3ec, vivid orange #f15a2b, ink #232523. Beautiful angled three-quarter view, all products fully visible within frame with ample beige negative space margins, side sunlight, no people, no UI, no website elements, no watermark. The entire background is pale warm beige, no horizon line.

Typography: Manrope and DM Sans, self-hosted Latin WOFF2 fonts from Google Fonts. Tailwind CLI follows https://tailwindcss.com/docs/installation/tailwind-cli.
