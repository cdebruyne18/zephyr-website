# Zephyr Archive — local website mockup

The website mockup is built in `dist/` using plain HTML, CSS, and JavaScript. The revised layout leads with the supplied Z artwork, two lifestyle photos, and the Founders Drop. It has not been published. The original brand and implementation handoff is preserved alongside the code.

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
- Each Founders Drop tile links to its own page (`hat-01.html`, `hat-02.html`) with the shared header, a photo gallery (arrows, thumbnails, keyboard arrows, and swipe on touch screens), the name, $38, “Coming November,” and a Buy now button. Below the price, two color swatches (Blue, White / Red) link the two colorway pages; the current one is outlined and named. **Launch gate** (top of `dist/shop.js`): `EARLY_ACCESS_OPENS` (2026-11-11 4PM ET) opens the unlisted `/early-access/` page, and `PUBLIC_LAUNCH` (2026-11-12 4PM ET) opens the hat pages. Before then the Buy now spot is a disabled “Opens 11.11 at 4PM ET” / “Drops 11.12 at 4PM ET” button, and the Buy Button SDK and cart icon don't load. The time comes from the server's `Date` header, not the device clock. `SALES_PAUSED` is a master off switch (now `false`; Shopify Payments was connected on 2026-11-04): set it to `true` to keep buying off even after those times, showing “Coming soon”. On localhost only, `?now=2026-11-12T16:01:00-05:00` previews any moment. The website gate is not enforcement by itself: anyone with the public storefront token can reach products published to the Buy Button channel, so the hats should only be published there from 11.11 4PM ET. `dist/shop.js` loads Shopify's Buy Button SDK, mounts each product's button into `.product-buy` (replacing the placeholder button once it renders), and runs one cart shared across pages; checkout happens on Shopify. Store domain, public storefront token, and product IDs (blue hat, hat-01.html = 8097212792915; white-and-red hat, hat-02.html = 8097213251667) are at the top of `shop.js`. Shopify's floating cart tab is hidden in favor of the header icon. A product only loads if it is Active and published to the Buy Button sales channel in Shopify. Each hat gallery has four photos: the blue hat (front, three-quarter, side, and the harbor photo in the green jacket) and the white-and-red hat (front, three-quarter, side, and one lifestyle photo at the lobster traps); the thumbnail row sizes itself to the number of photos. Clicking the photo (or its corner expand button) opens a full-screen viewer of the same photos with arrows, keyboard arrows, swipe, a counter, and Esc, × or a click outside the photo to close; it stays in sync with the gallery. The viewer is only on the hat pages. The placeholder slot style remains in the CSS for future products. To add a photo, replace a placeholder `<figure class="gallery-slide">` with one containing an `<img>`; thumbnails and the counter update automatically. No Shopify, cart, or checkout is connected.
- The page uses #FAF9F6 for a hint of cream, navy text, and restrained red accents. The original cream remains a brand color.
- The original Z artwork is centered in the header, with a continuous CSS perspective rotation at a constant speed (one full turn every 14 seconds). The logo links to the home page from every page; the rotation pauses while the mouse is over it or it has keyboard focus. Reduced-motion preferences keep it still. This is a rotating flat graphic, not a modeled 3D object.
- Two full-width lifestyle photos (a from-behind waterfront shot with a canvas tote, and the harbor) sit side by side directly under the header, so they are the first thing visitors see. The Founders Drop follows with two equal product columns at every screen size, filling the viewport width inside the page's side margins. Its two hat tiles (both named Founder Snapback, blue and white-and-red) use the user-supplied price of $38 each; the old passport hero is still gone. The brand story lives only on the About page; the home page ends with the signup and the footer.
- A footer at the bottom of the home page lists About, Privacy Policy, Terms of Service, Refund Policy, and Contact. Privacy Policy opens `privacy-policy.html`, a general draft that should be reviewed before launch; its mailing-address line is left out on purpose until the user wants to publish an address; it repeats the footer. Refund Policy opens `refund-policy.html`, a general apparel-style draft (30-day returns of unworn items, exchanges when in stock, customer-paid return shipping unless the item is damaged, defective, or wrong, refunds in 5–10 business days) with two fill-ins (date, contact email). Terms of Service opens `terms-of-service.html`, a general draft (site use, products, pricing, orders and payment through Shopify, shipping, intellectual property, disclaimers, liability, governing law) with three fill-ins (date, contact email; governing law is Virginia, where the LLC is filed); it links to the other two policies. About opens `about.html`: the brand story exactly as supplied (including “Deep Roots, Worn Everywhere goes beyond just clothing.”) beside a photo of lobster boats in the harbor, followed by a “Worn Everywhere” passage drafted with the user (four scenes in serif italic beside a red rule, then “Zephyr Archive isn’t made for one place…”), and a link back to the Founders Drop. Contact opens `contact.html`: support@zephyrarchive.com (create it in Google Workspace as a shared group or alias before launch), “We reply within 12 hours,” a note to include the order number, a Refund Policy link, and Instagram @zephyrarchive_. The policies use the same support address; all three are dated November 4, 2026 and have no fill-ins left; update the “Last updated” date whenever a policy changes. All three policies name the business as Zephyr Archive, LLC (a Virginia LLC). The red “For those that live between worlds.” banner was removed from every page at the user's request.
- “First to know.” is a simple email row that signs people up to the same Shopify list as the store's own signup page.
- The favicon uses the supplied serif logo; original image files are unchanged.
- Both Founders Drop tiles show the user-supplied hat product photos (blue, and white with a red brim). The $38 price came from the user; both hats are named Founder Snapback (the user's name; Shopify titles may differ), and no garment specifications or exact launch date have been invented.
- Product image areas have a responsive height capped at 380px. Complete photos stay centered inside them, so hats remain smaller on large screens and the gray backgrounds take up less vertical space.
- “First to know” is a **link button** (“Sign up for updates →”) that opens Shopify's own signup page (`https://shop.zephyrarchive.com/password#zephyr-signal`) in a new tab. That Shopify form adds people straight to Shopify customers (tags `newsletter, prelaunch-2026`). A form on this site cannot submit to Shopify's customer form: Shopify's spam protection rejects cross-site submissions (tried 2026-11-11: background fetch, new-tab post; neither delivered). The proper on-site fix is a Vercel function using the Shopify Admin API.
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

Use a nearly white `#FAF9F6` background with navy `#3B4967` and red `#A24857`. Center the Z artwork, then lead directly with the two waterfront lifestyle photos, followed by the **Founders Drop** product grid. Keep the signup compact and the full story on the About page. These are the user's revisions to the original direction.

The biggest missing piece is actual product photography. Exact release date, prices, colors, fit, materials, and product names remain unconfirmed. None are invented in the starter content.

This complete project is saved in `~/Downloads/Zephyr Archive/`. The `brand-originals/` folder includes copies of all supplied artwork masters, PNG exports, and original photos. The original Downloads folder and synced project sources were not changed. Treat `brand-originals/` as read-only source material and edit the website in `dist/`.
