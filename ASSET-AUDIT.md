# Supplied folder audit

Source: `PASSPORT GRAPHIC MASTER - Copy/`

Found **28 files: 13 PNGs, 12 Illustrator (.ai) files, and 3 Photoshop (.psd) files**. All PNGs were inspected visually and their dimensions/transparency examined. Native files were inventoried by format/header; their editable layers and hidden content were not audited. No text brief, font file, product photo, garment mockup, pricing sheet, or product specification was present.

All 13 PNGs are copied unchanged into `brand-reference/png/`. Illustrator and Photoshop masters remain in the original folder. The full machine-readable inventory is `brand-reference/inventory.json`.

## Exact asset mapping

| PNG filename | Content / role | Proposed use |
| --- | --- | --- |
| `ZEPHYR FINAL LOGO SET.png` | Nine-logo overview in muted blue on white; 4000 × 3000 | Brand reference only; do not put the whole sheet in the site header |
| `SERIF 1.png` | Stacked “Zephyr Archive” | Alternate lockup for small editorial spaces |
| `SERIF 2.png` | Horizontal “Zephyr Archive” | **Recommended primary header logo** |
| `SERIF 3.png` | Horizontal “Zephyr Arc.” | Abbreviated alternate |
| `SANS 1.png` | Horizontal “ZEPHYR ARC.” | Secondary identity option |
| `SANS 2.png` | Horizontal “ZEPHYR ARCHIVE” | Secondary identity option |
| `SANS 3.png` | Stacked “ZEPHYR ARCHIVE” | Secondary identity option |
| `SCRIPT 1.png` | Textured script variant, as shown in overview | Occasional accent; verify alpha compositing in final placement |
| `SCRIPT 2.png` | Smooth script variant, as shown in overview | Occasional accent; verify alpha compositing in final placement |
| `SCRIPT 3.png` | Script with “ARC.”, as shown in overview | Occasional accent; verify alpha compositing in final placement |
| `PASSPORTS GRAPHIC.png` | Layered passport pages, entry/visa stamps, and brand lettering | One editorial image supporting “between worlds” |
| `ZEPHYR STAMP GRAPHIC.png` | Script mark and entry-stamp wording | Optional small accent; verify transparency before use |
| `Z FOR ZEPHYR.png` | Z-themed standalone artwork | Secondary reference; not chosen for the first page |

Except for the logo overview, all PNG canvases are **2000 × 2000 pixels** and contain transparency. The numbering of logo variants is not consistent across families: SERIF 1 is stacked, while SANS 1 is abbreviated.

## Web preparation observations

**Transparent padding matters.** The recommended horizontal SERIF 2 logo occupies only about 1698 × 256 pixels inside a 2000 × 2000 canvas. Its nonzero-alpha bounds are x=148, y=870 through x=1846, y=1126 (right and bottom exclusive). Rendering the entire square at ordinary header width would make the mark tiny and introduce excessive vertical space. Preserve the mark and fit the export or display viewport to the artwork.

Other measured nonzero-alpha bounds, if needed:

| File | Bounds: left, top, right, bottom |
| --- | --- |
| SERIF 1 | 562, 733, 1435, 1179 |
| SERIF 3 | 353, 870, 1636, 1126 |
| SANS 1 | 324, 874, 1674, 1117 |
| SANS 2 | 125, 876, 1872, 1115 |
| SANS 3 | 560, 743, 1435, 1251 |

**Some image previews mishandle transparency.** The inspection viewer showed black rectangles or apparent blue blocks in several script/stamp/Z previews. Pixel inspection found that much of those areas has zero alpha. This is not sufficient evidence that the source files are damaged. Check the originals in an alpha-aware viewer before judging them or preparing derivatives. The local gallery supplies a white background for this purpose; browser rendering of the gallery was not verified in this environment.

**The passport export has faint pixels across its canvas.** Much of its nominally empty area is nearly transparent white, not completely transparent. It is approximately 5.8 MB. A future optimized web export should be visually checked on the chosen background; naïvely trimming only fully transparent pixels will not tightly fit it. Do not erase intentional paper texture or stamps.

**The individual logo PNGs are black.** The overview uses blue: its dominant non-white RGB is 59, 73, 103 (`#3B4967`), with a nearby blue also present. The user subsequently confirmed the palette as navy `#3B4967`, red `#A24857`, and cream `#EDE5D3`. This confirmation is authoritative for the mockup. Black logos on cream are already coherent; a navy logo would be a derivative of the supplied standalone black export. Preserve the exact mark if preparing a navy version.

**Font identity is not established.** No font binaries or written font specification were supplied. Preserve the logo image; use clearly documented fallback fonts for page text.

## Native master mapping

- SERIF 1–3, SANS 1–3, and SCRIPT 1–3 each have same-named `.ai` masters.
- `PASSPORTS GRAPHIC.png` corresponds by filename to `PASSPORTS GRAPHIC.ai`.
- `ZEPHYR STAMP GRAPHIC.png` has a differently named master, `ZEPHYR STAMP.ai`.
- `Z FOR ZEPHYR.png` has both `.ai` and `.psd` masters.
- Additional Photoshop masters: `PASSPORT GRAPHIC MASTER.psd` and `PASSPORT GRAPHIC MASTER - Copy.psd`.
- All AI files have PDF-compatible headers; each reports one page. This does not verify editable structure, fonts, or linked-resource completeness.
- The three PSD headers report 2000 × 2000 pixels, four 8-bit channels.

Keep original and copied reference files intact. Put selected web derivatives in a separate `assets/` directory, with a short note identifying source and transformations.
