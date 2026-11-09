import { useEffect, useState } from "react";
import { Link, goSection } from "../router.jsx";
import { useStore, haptic } from "../context/StoreContext.jsx";
import { waLink } from "../utils.js";
import { contact } from "../data/siteData.js";
import Icon from "./Icon.jsx";

const items = [["story", "Our Craft", "hand"], ["craft", "How it works", "palette"], ["faq", "FAQs", "sprout"], ["contact", "Contact us", "whatsapp"]];

function Sheet({ onClose }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const go = (id) => { onClose(); setTimeout(() => goSection(id), 280); };
  return (
    <div className="sheet-bg" onClick={onClose}>
      <div className="sheet" role="dialog" aria-label="More" onClick={(e) => e.stopPropagation()}>
        <div className="grab" />
        <h3>Himcraftstudio</h3>
        <p className="muted">Woolen &amp; Crochet, Entirely By Hand</p>
        <ul>{items.map(([id, label, icon]) => <li key={id}><button onClick={() => go(id)}><span className="ico-sm"><Icon name={icon} size={20} /></span>{label}<Icon name="arrow" size={18} /></button></li>)}</ul>
        <a className="btn wa full" href={waLink("Hi Him Craft Studio!")} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={20} /> Chat on WhatsApp</a>
        <a className="btn ghost full" href={`tel:${contact.phone.replace(/\s/g, "")}`}>Call {contact.phone}</a>
      </div>
    </div>
  );
}

// Mobile-only bottom tab bar (hidden on desktop via CSS)
export default function TabBar({ path }) {
  const { wish } = useStore();
  const [more, setMore] = useState(false);
  const on = { home: path === "/", shop: path.startsWith("/shop"), saved: path === "/wishlist" };
  return (
    <>
      <div className="tabbar" role="navigation" aria-label="Main">
        <Link to="/" className={"tab" + (on.home ? " on" : "")} onClick={() => haptic()}><span className="ti"><Icon name="home" size={22} /></span>Home</Link>
        <Link to="/shop" className={"tab" + (on.shop ? " on" : "")} onClick={() => haptic()}><span className="ti"><Icon name="grid" size={22} /></span>Catalog</Link>
        <a className="tab wa" href={waLink("Hi Him Craft Studio!")} target="_blank" rel="noopener noreferrer" onClick={() => haptic(12)}><span className="ti"><Icon name="whatsapp" size={27} /></span>Enquire</a>
        <Link to="/wishlist" className={"tab" + (on.saved ? " on" : "")} onClick={() => haptic()}><span className="ti"><Icon name="heart" size={22} /></span>Saved{wish.length > 0 && <b key={wish.length}>{wish.length}</b>}</Link>
        <button className={"tab" + (more ? " on" : "")} onClick={() => { haptic(); setMore(true); }}><span className="ti"><Icon name="dots" size={22} /></span>More</button>
      </div>
      {more && <Sheet onClose={() => setMore(false)} />}
    </>
  );
}
