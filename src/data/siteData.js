// All editable site content (taken from the Him Craft Studio website).
export const whatsapp = {
  number: "917018682298",
  greeting: "Hi Him Craft Studio! I'd like to enquire about",
};

export const contact = {
  phone: "+91 70186 82298",
  // Paste your Formspree endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
  // If left empty, the enquiry form opens WhatsApp with the message pre-filled.
  formspree: "",
};

export const site = {
  name: "Him Craft Studio",
  tagline: "Handmade woolen creations",
  logo: "/images/logo.png",          // dark logo — used in header & footer
  logoWhite: "/images/white-logo.png", // white logo — used on dark backgrounds
  announcement: "Order on WhatsApp  ·  Made to order ",
  social: [
    { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/himcraftstudio/" },
    { label: "Facebook",  icon: "facebook",  url: "https://www.facebook.com/people/Him-Craft-Studio/61568914106146/" },
  ],
  nav: [
    { label: "Home", to: "/" },
    { label: "Catalog", to: "/shop", menu: true },
    { label: "Our Craft", section: "story" },
    { label: "How it works", section: "craft" },
    { label: "Contact", section: "contact" },
  ],
  hero: {
    eyebrow: "Woolen & Crochet, Entirely By Hand",
    title: [{ text: "Every stitch," }, { text: "made by hand,", accent: true }, { text: "made to last." }],
    typed: ["Crochet bouquets.", "Cozy winter wear.", "Handmade bags.", "Custom colours & sizes."],
    sub: "From cozy hand-knit winter wear to beautiful crochet creations, Him Craft Studio brings the warmth, charm and timeless beauty of handmade woolen crafts to life, one stitch at a time.",
    image: "https://picsum.photos/seed/himcraft-hero/800/900",
  },
  marquee: ["Hand-Crocheted", "Hand-Knit", "Made to Order", "Custom Colours", "Made with Patience"],
};

export const stats = [
  { to: 20, suffix: "+", label: "Product lines" },
  { to: 100, suffix: "%", label: "Handmade" },
  { to: 11, label: "Categories" },
];

export const collections = [
  { id: 1, slug: "bouquets", name: "Flower Bouquets", title: "Flowers that never wilt", text: "Hand-crocheted bouquets, single stems and potted plants. A gift that lasts long after the day is over.", bullets: ["Bouquets, stems and potted plants", "Colours made to match your occasion", "Perfect for gifting"], image: "https://picsum.photos/seed/col-bouquets/800/600", tone: "blush" },
  { id: 2, slug: "sweaters", name: "Winter Wear", title: "Warmth, one stitch at a time", text: "Cozy hand-knit sweaters, cardigans, scarves, caps, gloves and socks for the cold months.", bullets: ["Sweaters, cardigans and shawls", "Caps, gloves and socks", "Sizes and colours made to order"], image: "https://picsum.photos/seed/col-winter/800/600", tone: "brand" },
  { id: 3, slug: "bags", name: "Bags & Accessories", title: "Small pieces, big charm", text: "Crochet totes and pouches, keychains and hair accessories, each made individually by hand.", bullets: ["Totes and sling pouches", "Keychains and charms", "Hair clips and scrunchies"], image: "https://picsum.photos/seed/col-bags/800/600", tone: "stone" },
  { id: 4, slug: "decor", name: "Home Décor", title: "Make your home cosier", text: "Cushion covers, coasters and more, to bring a handmade touch to every corner of your home.", bullets: ["Textured cushion covers", "Crochet coaster sets", "Custom pieces on request"], image: "https://picsum.photos/seed/col-decor/800/600", tone: "sand" },
];

export const story = {
  title: "Made with yarn, needles & patience.",
  text: "Every piece is individually hand-crocheted or hand-knit. No mass production, ever. Most pieces are crafted fresh once you enquire, so colours and sizes can be customised just for you.",
  image: "https://picsum.photos/seed/himcraft-story/600/600",
};

export const process = [
  { n: "01", label: "Tell us what you love", text: "Browse the catalog and message us on WhatsApp. Ask for pricing, availability and delivery timelines.", image: "https://picsum.photos/seed/process1/300/300" },
  { n: "02", label: "Pick colours & size", text: "Most pieces are made to order, so you can choose colours and sizes that suit you.", image: "https://picsum.photos/seed/process2/300/300" },
  { n: "03", label: "Handmade just for you", text: "Your piece is hand-crocheted or hand-knit, one stitch at a time, with real care.", image: "https://picsum.photos/seed/process3/300/300" },
  { n: "04", label: "Delivered across India", text: "We confirm shipping to your pin code on WhatsApp and send it to your door.", image: "https://picsum.photos/seed/process4/300/300" },
];

export const values = [
  { icon: "hand", title: "Made with care", text: "Every piece is individually hand-crocheted or hand-knit. No mass production." },
  { icon: "palette", title: "Made to order", text: "Most pieces are crafted fresh once you enquire, so colours and sizes can be customised." },
  { icon: "whatsapp", title: "Real human replies", text: "Message us directly on WhatsApp for quick answers, quotes and order updates." },
];

export const faqs = [
  { q: "Are all pieces really handmade?", a: "Yes. Every piece is individually hand-crocheted or hand-knit at Him Craft Studio. There is no mass production." },
  { q: "Can I choose my own colours and sizes?", a: "Most pieces are crafted fresh once you enquire, so colours and sizes can be customised. Tell us what you have in mind." },
  { q: "How do I place an order?", a: "Message us on WhatsApp or send an enquiry from this page. We'll reply with pricing, availability and delivery timelines. There is no online payment on the website." },
  { q: "Do you deliver across India?", a: "Yes, we deliver pan-India. Share your pin code on WhatsApp and we'll confirm shipping." },
  { q: "Can I ask for something custom?", a: "Of course. Send us your idea and we'll tell you what's possible, along with pricing and timelines." },
];

export const footer = {
  blurb: "Beautiful handmade woolen creations: bouquets, accessories, bags, winter wear and home décor, hand-crafted with love.",
  columns: [
    { title: "Explore", links: [{ label: "Full Catalog", to: "/shop" }, { label: "Our Craft", section: "story" }, { label: "How it works", section: "craft" }, { label: "Contact Us", section: "contact" }] },
    { title: "Catalog", links: [{ label: "Flower Bouquets", to: "/shop?cat=bouquets" }, { label: "Winter Wear", to: "/shop?cat=sweaters" }, { label: "Bags & Pouches", to: "/shop?cat=bags" }, { label: "Home Décor", to: "/shop?cat=decor" }] },
  ],
};
