# Zephyr Archive — first local website mockup

## Current direction — user revision

This revision supersedes the initial layout recommendations below. The implemented page is in `dist/`.

- Background: **#FAF9F6**, a very light tint of cream, rather than the full brand cream.
- Put the original **Z FOR ZEPHYR** artwork top center, using its supplied transparent PNG for the browser. Its CSS perspective rotation is a 3D-style effect on flat artwork, not a modeled solid object. Clicking the mark pauses/resumes it; reduced-motion preferences keep it still.
- Compress the brand statement into a narrow one-line banner with red #A24857 background and cream #EDE5D3 lettering. Remove the large introductory hero and passport collage from the page.
- Put “Rooted in New England.” at the top left in place of the header's Drop One link. Remove the bottom footer entirely.
- Make **Drop One** the primary heading. Put hats and hoodies immediately below, side by side on desktop and mobile, in shorter image areas.
- Keep “First to know.” to a simple email row. Put the full founders' story in a disclosure that is closed by default; the header story link opens it. Show the three newly supplied Fenway and beach photos in a compact strip beneath Deep Roots, outside the disclosure.
- Prioritize simplicity and substantially less scrolling. Preserve honest photo placeholders until product photography is supplied.

The remaining sections preserve the original brief as background only; where they disagree with this revision, follow this revision and the current user request.

## The central idea

Create a quiet, personal introduction to an apparel brand for people who carry their roots into different places and parts of life. The site should feel considered, familiar, and lasting. Simplicity comes from a clear sequence, good typography, and a small amount of strong imagery.

The identity is about belonging and continuity. Travel imagery supports that idea; it does not establish a travel service, a specific country of manufacture, or a detailed biography.

## Confirmed versus proposed

**Confirmed by the user:** Zephyr Archive; founders Chris and Paddy DeBruyne; New England roots; the two supplied brand lines; an upcoming November drop with hats and hoodies; a simple local mockup built through VS Code; red `#A24857`, navy `#3B4967`, and cream `#EDE5D3` as the exact brand palette.

**Observed in the files:** serif, condensed sans-serif, and script logo families; a muted blue logo overview; passport/visa imagery; a script-and-entry-stamp graphic; a Z graphic. These form a useful visual vocabulary, but the folder is not a written brand manual.

**Proposed in this brief:** the serif logo as the primary web identity, cream as the dominant background with navy text and restrained red accents, one-page structure, category previews, the demo email form, and the exact supporting copy below. These are working design choices, not previously approved layout rules.

**Unconfirmed:** exact launch date/year, product count within each category, names, colors, sizes, fabric, weight, construction, fit, price, availability, shipping, returns, social handles, and email platform. Do not infer these from visual references or passport dates.

## Visual direction

Use **SERIF 2.png**, the full horizontal serif wordmark, in the header. SERIF 1 is the stacked alternative; SERIF 3 is abbreviated. File numbering differs between logo families—consult the audit. Preserve the logo artwork and proportions. Use the supplied image rather than approximating the lettering with an installed font.

For page headings, use a quiet serif such as the local Georgia fallback; for navigation, labels, and body copy, use the system sans-serif stack. These are web layout defaults, not identified brand fonts. The folder contains no webfont files.

Confirmed brand palette and proposed supporting neutrals:

| Role | Color | Basis |
| --- | --- | --- |
| Primary brand ink and body text | `#3B4967` | User-confirmed navy; also matches the dominant blue in the logo overview |
| Page background | `#EDE5D3` | User-confirmed cream |
| Accent and primary action | `#A24857` | User-confirmed red |
| Secondary text | `#626760` | Proposed muted neutral |
| Divider | `#D8D6CE` | Proposed rule color; not for small text |
| Image well | `#ECEAE3` | Proposed neutral backdrop |

Let cream and navy carry most of the page. Red should provide one deliberate point of emphasis, such as the main action or a small release label. Avoid large competing red and navy panels. Navy on cream has approximately 7.17:1 contrast; red on cream approximately 4.65:1. Keep red text at full opacity on cream, and use cream text on a red button. Avoid red text on navy.

Use a content width around 1200px, desktop gutters of 48–64px, and mobile gutters of 20–24px. Section spacing should feel generous without creating empty screenfuls. Body copy should usually stay within 60–65 characters per line. Use hairline dividers and simple underlined text links. Avoid a page full of rounded cards.

The script logo is a secondary accent, useful later in a garment detail or sign-off. Do not combine all logo families in the header. Use the passport graphic once, with enough breathing room to read as an archival object. Keep text outside busy artwork. Avoid repeating stamps across every section or making a decorative passport theme dominate the brand.

## One-page structure

### 1. Header

Left: the horizontal serif wordmark, linked to the top. Right: “November release” and “Our story,” both linking to sections. A third “Stay in the loop” link may appear if it fits without crowding. Keep mobile navigation simple enough to avoid a hamburger menu in the first version. Do not add a cart before there is something to buy.

### 2. Hero

Small introductory label: “Zephyr Archive · November release”

Main heading, preserved verbatim: **For those that live between worlds.**

Supporting line: **Hats and hoodies. Arriving November.**

Primary link: **Explore the release** → category preview section.

Use the hero's space and typography to establish the tone. On desktop, a roughly 60/40 split can pair the headline with the supplied passport artwork on a quiet background. On mobile, put the headline and release line first, then the artwork. Keep the image secondary to the brand statement. The passport image is brand artwork, not product photography.

### 3. November release

Heading: **The November release**

Two category previews: **Hats** and **Hoodies**, each with **Arriving November**. These are category labels, not confirmed product names or a claim that there are exactly two SKUs.

Use large, equal-ratio image spaces, preferably 4:5. Product photography has not been supplied. For this review mockup, use clean neutral spaces with the visible label **Product photography to come**. Do not invent garment designs, silhouettes, prices, materials, available colors, or “limited stock.” Keep image replacement straightforward in the eventual code.

Do not make cards appear clickable unless they have a meaningful destination. The first version does not need product pages, filters, search, cart, checkout, or size selectors.

### 4. Our story

Heading, preserved verbatim: **Deep Roots, Worn Everywhere**

Proposed shortened body copy, derived only from the user-supplied story:

“Founded by brothers Chris and Paddy DeBruyne, Zephyr Archive is rooted in New England and made for people who carry their culture with them, wherever life takes them.”

“For those who carry their culture, values and beliefs wherever they go.”

Attribution: **Chris & Paddy DeBruyne · Founders**

Keep the full original copy available in SOURCE-COPY.md. The shortened version is a draft, not a direct quotation. If the user prefers the original text, use it without inventing additional founder history. Do not interpret New England roots as a manufacturing claim.

### 5. Launch notification demo

Heading: **First to know.**

Supporting copy: **News on the November release.**

Use an explicitly labeled email input and a button reading **Notify me**. Show a small visible note before the form: **Demo only — no email is sent or saved.** Validate with native email validation; use an inline accessible status message for a valid submission: **Preview complete. No signup was sent or saved.** Keep the value only in transient page state; no local storage, network request, or mailing-list connection.

This section is a proposed interaction for the mockup. A real signup service and its final consent copy can be added when the owners choose to launch.

### 6. Footer

Brand name, “Deep Roots, Worn Everywhere,” and a back-to-top link are sufficient. Add real contact or social links only when supplied. Do not fill the footer with broken links, invented policies, or empty pages.

## Implementation starting point

Use plain HTML, CSS, and JavaScript for this small local prototype unless an existing project already has a stack. Suggested files: `index.html`, `styles.css`, `script.js`, and an `assets/` directory for selected web assets. Read the supplied JSON as authoring data; the page should not depend on fetching a local JSON file to render if it is opened directly from disk.

Use `starter/tokens.css` as a foundation for color, type, and spacing. Keep all product and release copy easy to find and replace. Prefer semantic sections, real links for navigation, buttons for actions, and one main heading. Supply image dimensions, use concise alt text, and lazy-load only images below the first screen.

Create web exports without changing the reference copies. For logos, a tightly fitted SVG exported from the AI master is preferable. If that is unavailable, use a tightly framed copy of the existing transparent PNG or a documented CSS viewport around the original; retain the exact mark. Do not guess the logo's font, redraw it, or stretch it. Inspect on light and dark backgrounds when validating transparency.

Keep motion minimal; any optional reveal should respect reduced-motion preferences. Maintain visible keyboard focus and readable contrast. Avoid external fonts or services in the first mockup so local review remains straightforward.

## Completion checks

- Review at 375px, 768px, and 1440px widths; no horizontal scrolling, clipped logo, or overlapping text.
- Check every selected image loads and its transparent padding does not create unexpected empty space.
- Confirm navigation reaches the intended sections and remains usable by keyboard.
- Confirm empty and invalid email values do not show success; valid demo submissions state that nothing was sent or saved.
- Check focus visibility, heading order, labels, alternative text, contrast, and reduced-motion behavior.
- Confirm the page contains no invented prices, exact dates, specifications, testimonials, purchase claims, or social links.
- Document how to open the page and list remaining product placeholders. Do not publish the mockup.

## Inputs that will improve the next version

Ask the founders for a clear front view of each actual garment, a detail shot showing fabric or embroidery, and one simple lifestyle image. Then obtain exact product names, colors, sizing, fit, materials, prices, release date, shipping/returns details, and any preferred logo/font guidance. These inputs are not required to build the first honest local mockup.
