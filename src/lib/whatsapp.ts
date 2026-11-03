import settings from "@/data/site-settings.json";
export function whatsappLink(message: string) {
  const number = settings.whatsappNumber.replace(/\\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export function productEnquiry(name: string, url?: string) {
  return whatsappLink(`Hello HimCraft Studio! I'm interested in ${name}.${url ? ` Please share more details: ${url}` : ""}`);
}
