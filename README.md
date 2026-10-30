# Zephyr Archive — local website mockup

The website mockup is built in `dist/` using plain HTML, CSS, and JavaScript. The revised layout leads with the supplied Z artwork, a small brand banner, and Drop One. It has not been published. The original brand and implementation handoff is preserved alongside the code.

## Start here

1. Open this entire `Zephyr Archive` folder in Downloads in Visual Studio Code. You can also open `zephyr-archive.code-workspace`.
2. View the running preview at **http://127.0.0.1:5173/**.
3. Edit `dist/index.html` for page content, `dist/styles.css` for appearance, and `dist/script.js` for the demo form behavior. Save and refresh your browser to see changes.

No package installation or build step is needed. You can also open `dist/index.html` directly in a browser.

To restart the local preview later, double-click `start-local.command` in Finder, or open the VS Code terminal in this folder and run:

```sh
./start-local.command
```

Keep that terminal running while you work. Stop it with Control+C. If port 5173 is already in use by this preview, use the existing running server. The server is bound to this computer only and serves the existing `dist/` files directly. Save your edits, then refresh the browser; there is no build step or automatic reload.

## Current behavior and remaining inputs

- Header links open the story and jump to the notification form.
- The page uses #FAF9F6 for a hint of cream, navy text, and restrained red accents. The original cream remains a brand color.
- The original Z artwork is centered in the header, with a continuous CSS perspective rotation at a constant speed (one full turn every 14 seconds). Click the mark to pause or resume. Reduced-motion preferences keep it still. This is a rotating flat graphic, not a modeled 3D object.
- Drop One and both product categories lead the page; the lengthy hero is removed. The story is collapsed by default and can be opened from the header or its own disclosure.
- “Rooted in New England.” sits at the top left; the bottom footer is removed. The brand banner uses red #A24857 with cream #EDE5D3 lettering.
- “First to know.” is a simple email row. The Deep Roots section includes the three supplied Fenway and beach photographs in a compact strip.
- The favicon uses the supplied serif logo; original image files are unchanged.
- Hat and hoodie image areas deliberately say “Product photography to come.” No garment specifications, product prices, or exact launch date have been invented.
- The form uses native email validation and displays an honest demo confirmation. It sends no requests and stores no email addresses.
- Layout rules cover desktop and mobile, with visible keyboard focus and reduced-motion support. Browser interaction and viewport testing have not yet been performed.
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

Use a nearly white `#FAF9F6` background with navy `#3B4967` and red `#A24857`. Center the Z artwork above a narrow **“For those that live between worlds.”** banner, then lead with **Drop One** and the two product categories. Keep the signup compact and the full story behind its disclosure. These are the user's revisions to the original direction.

The biggest missing piece is actual product photography. Exact release date, prices, colors, fit, materials, and product names remain unconfirmed. None are invented in the starter content.

This complete project is saved in `~/Downloads/Zephyr Archive/`. The `brand-originals/` folder includes copies of all supplied artwork masters, PNG exports, and original photos. The original Downloads folder and synced project sources were not changed. Treat `brand-originals/` as read-only source material and edit the website in `dist/`.
