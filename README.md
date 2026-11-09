# Himcraftstudio: React + Vite catalogue site (WhatsApp enquiries, no online payment)

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # static site in /dist (works on Vercel/Netlify/any static host)

## Manage your products (local data file)
Open **`src/data/products.js`**. Everything about the catalog lives there, in plain readable blocks:

    {
      id: 23,                              // unique number
      name: "Pink Tulip Bouquet",
      category: "bouquets",                // must match a slug in `categories`
      price: 1499,                         // or null to show "Price on enquiry"
      colors: ["Rose", "Blush"],           // names from `colorHex` (add your own there)
      sizes: ["Free size"],
      featured: true,                      // appears in "Favourites"
      image: "/images/pink-tulip-bouquet.jpg",
      images: ["/images/a.jpg", "/images/b.jpg"],   // optional gallery
      description: "Short text for the product page.",
    },

- **Add:** copy a block, change the fields, drop the photo into `public/images/`.
- **Edit / remove:** change or delete the block. Slugs/URLs are generated from the name automatically.
- **Categories:** edit the `categories` list at the top of the same file.
- The page updates instantly while `npm run dev` is running.

## Other content
- `src/data/siteData.js`: WhatsApp number, phone, hero text, story, steps, FAQs, footer, optional `logo`.
- `src/theme.css`: all colours (premium mulberry / gold / ivory palette). Change a value to re-colour the whole site.
- Enquiry form: paste your Formspree URL into `contact.formspree` in siteData.js; if empty it opens WhatsApp with the message pre-filled.

## Mobile app feel
- On phones the site switches to an app layout: top app bar, floating bottom tab bar (Home, Catalog, WhatsApp, Saved, More), a "More" bottom sheet, a sticky Enquire bar on product pages with a back button, toasts, swipeable carousels and folding cards.
- It is installable: on Android/Chrome use "Add to Home screen", on iPhone Safari use Share > "Add to Home Screen". It opens full-screen with the Himcraftstudio icon (public/icon.svg and PNGs, manifest in public/manifest.webmanifest).
- Desktop extras: soft follow-cursor with a "View" label on images, subtle paper grain, page transitions.

## Notes
- No cart/checkout/payment. Product cards, product pages and the floating button open WhatsApp with a ready message.
- `tools/make_assets.py` only regenerates the dummy SVG images. Don't run it with `--data` after editing products.js (it would overwrite your file).
- Animations respect the "reduce motion" system setting.
