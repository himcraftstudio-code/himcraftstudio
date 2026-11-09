import { whatsapp } from "./data/siteData.js";
export const inr = (n) => "₹" + n.toLocaleString("en-IN");
// Handle both absolute URLs (https://…) and local paths (/images/…)
const url = (s) => (s && s.startsWith("http") ? s : s.replace(/^\//, import.meta.env.BASE_URL));
export const bg = (src) => ({ backgroundImage: `url(${url(src)})` });
export const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
export const waLink = (text) => `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(text)}`;
export const enquiry = (p, extra = "") => waLink(`${whatsapp.greeting} ${p.name}${p.price ? ` (${inr(p.price)})` : ""}${extra}.`);
