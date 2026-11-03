import Link from "next/link";
import { Heart, Instagram, MapPin, Mail } from "lucide-react";
import settings from "@/data/site-settings.json";
import WhatsAppLink from "@/components/whatsapp-link";
export default function Footer() {
  return <footer className="footer"><div className="footer-main"><div><Link href="/" className="brand footer-brand"><span className="brand-mark">h.</span><span><strong>himcraft</strong><small>STUDIO · HANDMADE WITH LOVE</small></span></Link><p>Little things, made slowly.<br/>Made with love, made to be cherished.</p></div><div><h4>Explore</h4><Link href="/products">All creations</Link><Link href="/#story">Our story</Link><Link href="/contact">Contact us</Link></div><div><h4>Say hello</h4><p><MapPin size={15}/>{settings.location}</p><p><Mail size={15}/>{settings.email}</p><WhatsAppLink message="Hello HimCraft Studio! I have an enquiry." label="WhatsApp us" className="footer-whatsapp"/></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} HimCraft Studio. Made with <Heart size={13} fill="currentColor"/>.</span><span>Handmade, always.</span></div></footer>;
}