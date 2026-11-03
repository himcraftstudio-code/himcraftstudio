import Link from "next/link";
import { Instagram, Menu } from "lucide-react";
import settings from "@/data/site-settings.json";
import WhatsAppLink from "@/components/whatsapp-link";
export default function Header() {
  return <><div className="announcement">{settings.announcement}</div><header className="site-header"><Link href="/" className="brand"><span className="brand-mark">h.</span><span><strong>himcraft</strong><small>STUDIO · HANDMADE WITH LOVE</small></span></Link><nav className="desktop-nav"><Link href="/products">Shop</Link><Link href="/#story">Our story</Link><Link href="/contact">Contact</Link></nav><div className="header-actions"><WhatsAppLink message="Hello! I'd love to know more about your handmade collection." label="Let's talk" className="header-cta" /><span className="mobile-menu"><Menu /></span></div></header></>;
}