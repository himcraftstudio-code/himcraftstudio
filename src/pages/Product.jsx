import { useState } from "react";
import { Link } from "../router.jsx";
import { products, categories } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import Icon from "../components/Icon.jsx";
import { bg, inr, enquiry } from "../utils.js";

export default function Product({ slug }) {
  const p = products.find((x) => x.slug === slug);
  const { wish, toggleWish, notify } = useStore();
  const [size, setSize] = useState(null), [color, setColor] = useState(null), [shot, setShot] = useState(0);
  if (!p) return <main className="page"><div className="container"><h1>Product not found</h1><Link to="/shop" className="btn">Back to shop</Link></div></main>;
  const sz = size || p.sizes[0], cl = color || p.colors[0].name, cat = categories.find((c) => c.slug === p.category);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const share = async () => {
    const data = { title: p.name, text: `${p.name} | Him Craft Studio`, url: window.location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); notify("Link copied"); } } catch {}
  };
  const saved = wish.includes(p.id);
  const extra = ` in ${cl}${sz !== "Free size" ? `, size ${sz}` : ""}`;
  return (
    <>
    <main className="page">
      <div className="container">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to={`/shop?cat=${cat.slug}`}>{cat.name}</Link> / {p.name}</p>
        <div className="pdp">
          <Reveal>
            <div className="pdp-img"><span style={bg(p.images[shot] || p.image)} /></div>
            {p.images.length > 1 && <div className="thumbs">{p.images.map((im, i) => <button key={im} className={i === shot ? "on" : ""} style={bg(im)} onClick={() => setShot(i)} aria-label={`Photo ${i + 1}`} />)}</div>}
          </Reveal>
          <Reveal delay={100}>
            <h1>{p.name}</h1>
            {p.price ? <p className="pdp-price"><b>{inr(p.price)}</b></p> : <p className="por big">Price on enquiry. Message us for a quote.</p>}
            <p>{p.description}</p>
            <h4>Colour: {cl}</h4>
            <div className="swatches">{p.colors.map((c) => <button key={c.name} title={c.name} aria-label={c.name} className={cl === c.name ? "on" : ""} style={{ background: c.hex }} onClick={() => setColor(c.name)} />)}</div>
            {p.sizes[0] !== "Free size" && <><h4>Size</h4><div className="chips">{p.sizes.map((s) => <button key={s} className={sz === s ? "on" : ""} onClick={() => setSize(s)}>{s}</button>)}</div></>}
            <div className="buy">
              <a className="btn wa" href={enquiry(p, extra)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={20} /> Enquire on WhatsApp</a>
              <button className="btn ghost" onClick={() => toggleWish(p.id)}><Icon name="heart" size={18} /> {saved ? "Saved" : "Save"}</button>
              <button className="btn ghost" onClick={share}><Icon name="share" size={18} /> Share</button>
            </div>
            <ul className="perks">
              <li>Made to order. Colours and sizes can be customised.</li>
              <li>No online payment. Chat with us for pricing and order details.</li>
            </ul>
          </Reveal>
        </div>
        {related.length > 0 && <><h2 className="rel">You may also like</h2><div className="shop-grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div></>}
      </div>
    </main>
    <div className="buybar">
      <button className={"bb-ico" + (saved ? " on" : "")} onClick={() => toggleWish(p.id)} aria-label="Save"><Icon name="heart" size={22} /></button>
      <button className="bb-ico" onClick={share} aria-label="Share"><Icon name="share" size={22} /></button>
      <a className="btn wa" href={enquiry(p, extra)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={20} /> Enquire on WhatsApp</a>
    </div>
    </>
  );
}
