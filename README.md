# Zephyr Archive — local website mockup

The website mockup is built in `dist/` using plain HTML, CSS, and JavaScript. The revised layout leads with the supplied Z artwork, a small brand banner, and the Founders Drop. It has not been published. The original brand and implementation handoff is preserved alongside the code.

## Start here

1. Open this entire `Zephyr Archive` folder in Downloads in Visual Studio Code. You can also open `zephyr-archive.code-workspace`.
2. View the running preview at **http://127.0.0.1:5173/**.
3. Edit `dist/index.html` for the home page, `dist/hat-01.html` and `dist/hat-02.html` for the two hat pages, `dist/styles.css` for appearance, and `dist/script.js` for the demo form and the photo gallery. Save and refresh your browser to see changes.

No package installation or build step is needed. You can also open `dist/index.html` directly in a browser.

To restart the local preview later, double-click `start-local.command` in Finder, or open the VS Code terminal in this folder and run:

```sh
./start-local.command
```

Keep that terminal running while you work. Stop it with Control+C. If port 5173 is already in use by this preview, use the existing running server. The server is bound to this computer only and serves the existing `dist/` files directly. Save your edits, then refresh the browser; there is no build step or automatic reload.

## Current behavior and remaining inputs

- The header has Shop and About on the left, and Get notified plus a cart icon on the right. The cart icon opens the shared Shopify cart and shows a red item-count badge. Shop jumps to the Founders Drop on the home page; About opens its own page, `about.html`. The cart icon is a placeholder link that does nothing yet.
- Each Founders Drop tile links to its own page (`hat-01.html`, `hat-02.html`) with the shared header and banner, a photo gallery (arrows, thumbnails, keyboard arrows, and swipe on touch screens), the name, $38, “Coming November,” and a Buy now button. `dist/shop.js` loads Shopify's Buy Button SDK, mounts each product's button into `.product-buy` (replacing the placeholder button once it renders), and runs one cart shared across pages; checkout happens on Shopify. Store domain, public storefront token, and product IDs (Hat 01 = 8097212792915, Hat 02 = 8097213251667) are at the top of `shop.js`. Shopify's floating cart tab is hidden in favor of the header icon. A product only loads if it is Active and published to the Buy Button sales channel in Shopify. Each gallery has six photos: Hat 01 (front, three-quarter, side, harbor, street, surf) and Hat 02 (front, three-quarter, side, lobster traps, pub, beach); the thumbnail row sizes itself to the number of photos. Clicking the photo (or its corner expand button) opens a full-screen viewer of the same photos with arrows, keyboard arrows, swipe, a counter, and Esc, × or a click outside the photo to close; it stays in sync with the gallery. The viewer is only on the hat pages. The placeholder slot style remains in the CSS for future products. To add a photo, replace a placeholder `<figure class="gallery-slide">` with one containing an `<img>`; thumbnails and the counter update automatically. No Shopify, cart, or checkout is connected.
- The page uses #FAF9F6 for a hint of cream, navy text, and restrained red accents. The original cream remains a brand color.
- The original Z artwork is centered in the header, with a continuous CSS perspective rotation at a constant speed (one full turn every 14 seconds). Click the mark to pause or resume. Reduced-motion preferences keep it still. This is a rotating flat graphic, not a modeled 3D object.
- Two full-width lifestyle photos (a from-behind waterfront shot with a canvas tote, and the harbor) sit side by side directly under the red brand banner, so they are the first thing visitors see. The Founders Drop follows with two equal product columns at every screen size, filling the viewport width inside the page's side margins. Its two hat tiles (“Hat 01” and “Hat 02”, placeholder names) use the user-supplied price of $38 each; the old passport hero is still gone. The story is collapsed by default and can be opened from the header or its own disclosure.
- A footer at the bottom of the home page lists About, Privacy Policy, Terms of Service, Refund Policy, and Contact. Privacy Policy opens `privacy-policy.html`, a general draft with three highlighted fill-ins (last-updated date, contact email, mailing address) that should be reviewed before launch; it repeats the footer. Refund Policy opens `refund-policy.html`, a general apparel-style draft (30-day returns of unworn items, exchanges when in stock, customer-paid return shipping unless the item is damaged, defective, or wrong, refunds in 5–10 business days) with two fill-ins (date, contact email). Terms of Service opens `terms-of-service.html`, a general draft (site use, products, pricing, orders and payment through Shopify, shipping, intellectual property, disclaimers, liability, governing law) with three fill-ins (date, governing-law state, contact email); it links to the other two policies. About opens `about.html`: the brand story exactly as supplied (including “Deep Roots, Worn Everywhere goes beyond just clothing.”) beside a photo of lobster boats in the harbor, with a link back to the Founders Drop. The home page's collapsed story section is unchanged. Contact is still a placeholder (`data-placeholder-link`) that does nothing yet; set its `href` and remove that attribute once its page is built. The brand banner uses red #A24857 with cream #EDE5D3 lettering.
- “First to know.” is a simple email row that signs people up to the same Shopify list as the store's own signup page.
- The favicon uses the supplied serif logo; original image files are unchanged.
- Both Founders Drop tiles show the user-supplied hat product photos (blue, and white with a red brim). The $38 price came from the user; “Hat 01” and “Hat 02” are placeholder names, and no garment specifications or exact launch date have been invented.
- Product image areas have a responsive height capped at 380px. Complete photos stay centered inside them, so hats remain smaller on large screens and the gray backgrounds take up less vertical space.
- The signup form uses native email validation, then `script.js` posts it in the background to Shopify's customer form (`form_type=customer`, tags `newsletter,prelaunch-2026`) at the store's permanent myshopify address, so it keeps working after the domain moves to Vercel. Each signup becomes a Shopify customer subscribed to email marketing. Shopify's reply can't be read cross-site, so a completed request shows “You're on the list.” Without JavaScript the form posts directly to Shopify. A consent line links to the Privacy Policy.
- Layout rules cover desktop and mobile, with visible keyboard focus and reduced-motion support. The two-hat grid was checked in Chrome at 320, 375, 768, 1000, 1440, and 1920px browser widths: both cards fill their row equally with no horizontal page overflow. A full interaction audit remains outstanding.
- Checked JavaScript syntax, local assets, navigation targets, and unchanged reference image checksums. The local server returned HTTP 200 and Safari opened the page successfully.

The live reference website supplied by the user is https://zephyrarchive.com. It could not be retrieved during this build, so no additional claims or assets were taken from it. The earlier pasted brand copy remains the source of truth.

## What's inside

- [Website brief](BRAND-AND-WEBSITE-BRIEF.md): brand interpretation, layout, copy, behavior, and checks.
- [Codex prompt](CODEX-PROMPT.md): the original starting instruction, retained as build context.
- [Asset audit](ASSET-AUDIT.md): exact filename mapping, sizes, transparency notes, and missing inputs.
- [Original brand copy](SOURCE-COPY.md): the text you supplied, preserved separately from proposed copy.
- [Artwork gallery](brand-reference/gallery.html): a local review page showing unchanged PNG copies on white. Open it in your own browser to view the collection together. This is an asset gallery, not the proposed site.
- `brand-reference/png/`: all 13 original PNG exports, copied without alteration.
- `brand-reference/inventory.json`: inventory of all 28 supplied files.
- `starter/tokens.css`: proposed visual defaults.
- `starter/content.json`: structured copy and empty product fields.

## Recommended direction

Use a nearly white `#FAF9F6` background with navy `#3B4967` and red `#A24857`. Center the Z artwork above a narrow **“For those that live between worlds.”** banner, then lead with the two waterfront lifestyle photos, followed by the **Founders Drop** product grid. Keep the signup compact and the full story behind its disclosure. These are the user's revisions to the original direction.

The biggest missing piece is actual product photography. Exact release date, prices, colors, fit, materials, and product names remain unconfirmed. None are invented in the starter content.

This complete project is saved in `~/Downloads/Zephyr Archive/`. The `brand-originals/` folder includes copies of all supplied artwork masters, PNG exports, and original photos. The original Downloads folder and synced project sources were not changed. Treat `brand-originals/` as read-only source material and edit the website in `dist/`.
