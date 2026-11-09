import { useEffect, useState } from "react";
import { Link, NavLink, goSection } from "../router.jsx";
import { site } from "../data/siteData.js";
import { categories } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import { waLink } from "../utils.js";
import Icon from "./Icon.jsx";

export function Logo({ white = false }) {
  if (site.logo) return (
    <Link to="/" className="logo" aria-label={site.name}>
      <img
        src={white && site.logoWhite ? site.logoWhite : site.logo}
        alt={site.name}
        className="logo-img"
      />
    </Link>
  );
  return (
    <Link to="/" className="logo">
      <span className="logo-mark" aria-hidden="true">◎</span>
      <span>{site.name}<small>{site.tagline.toUpperCase()}</small></span>
    </Link>
  );
}

export default function Header({ path = "/" }) {
  const isPdp = path.startsWith("/product/");
  const { wish } = useStore();
  const [hide, setHide] = useState(false), [menu, setMenu] = useState(false), [solid, setSolid] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const f = () => {
      const y = window.scrollY;
      setSolid(y > 30);
      if (y > last + 6 && y > 240) setHide(true); else if (y < last - 6) setHide(false);
      last = y;
    };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={"header" + (hide && !menu ? " hide" : "") + (solid ? " solid" : "") + (isPdp ? " is-pdp" : "")}>
      <div className="bar">
        <button className="back" aria-label="Back" onClick={() => (window.history.length > 1 ? window.history.back() : (window.location.hash = "/shop"))}><Icon name="back" size={22} /></button>
        <Logo />
        <nav className={menu ? "open" : ""} onClick={() => setMenu(false)}>
          {site.nav.map((n) =>
            n.section ? <button key={n.label} onClick={() => goSection(n.section)}>{n.label}</button>
            : n.menu ? (
              <div key={n.label} className="has-menu">
                <NavLink to={n.to}>{n.label} <Icon name="chevron" size={12} /></NavLink>
                <div className="menu">{categories.map((c) => <Link key={c.slug} to={`/shop?cat=${c.slug}`}>{c.name}</Link>)}</div>
              </div>
            ) : <NavLink key={n.label} to={n.to} end>{n.label}</NavLink>)}
        </nav>
        <div className="icons">
          <Link to="/shop" aria-label="Search products"><Icon name="search" /></Link>
          <Link to="/wishlist" aria-label="Wishlist" className="badge-wrap"><Icon name="heart" />{wish.length > 0 && <b key={wish.length}>{wish.length}</b>}</Link>
          <a href={waLink("Hi Him Craft Studio!")} target="_blank" rel="noopener noreferrer" className="wa-pill" data-mag><Icon name="whatsapp" size={18} /><span>Enquire</span></a>
          <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}><Icon name={menu ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
  );
}
