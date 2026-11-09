import { useState } from "react";
import { Link } from "../router.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { categories } from "../data/products.js";
import { inr, enquiry } from "../utils.js";
import Icon from "./Icon.jsx";

export default function ProductCard({ p }) {
  const { wish, toggleWish } = useStore();
  const on = wish.includes(p.id);
  const imgs = p.images && p.images.length > 0 ? p.images : [p.image];
  const [idx, setIdx] = useState(0);
  const cat = categories.find((c) => c.slug === p.category);
  const detailUrl = `/product/${p.slug}`;

  return (
    <article className="card">

      {/* ── main image — clicking goes to detail page ── */}
      <Link to={detailUrl} className="card-img-wrap" aria-label={`View ${p.name}`}>
        <div
          className="card-img"
          style={{ backgroundImage: `url(${imgs[idx]})` }}
        />
        {cat && <span className="card-badge">{cat.short}</span>}
        <button
          className={"heart" + (on ? " on" : "")}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(p.id); }}
          aria-label={on ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Icon name="heart" size={16} />
        </button>
      </Link>

      {/* ── thumbnails — only show when more than 1 image ── */}
      {imgs.length > 1 && (
        <div className="card-thumbs">
          {imgs.map((src, i) => (
            <button
              key={i}
              className={"card-thumb" + (i === idx ? " on" : "")}
              style={{ backgroundImage: `url(${src})` }}
              onClick={() => setIdx(i)}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── info ── */}
      <h3><Link to={detailUrl}>{p.name}</Link></h3>
      <p className="price">
        {p.price ? <b>{inr(p.price)}</b> : <span className="por">Price on enquiry</span>}
      </p>
      <a className="enq" href={enquiry(p)} target="_blank" rel="noopener noreferrer">
        <Icon name="whatsapp" size={15} /> Enquire on WhatsApp
      </a>

    </article>
  );
}
