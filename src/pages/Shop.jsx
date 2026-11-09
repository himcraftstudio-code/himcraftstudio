import { useMemo } from "react";
import { useSearchParams } from "../router.jsx";
import { products, categories } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";

const sorts = { az: (a, b) => a.name.localeCompare(b.name) };

export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const cat = sp.get("cat") || "", q = sp.get("q") || "", tag = sp.get("tag") || "", sort = sp.get("sort") || "";
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n); };
  const list = useMemo(() => {
    const r = products.filter((p) => (!cat || p.category === cat) && (!q || (p.name + p.description).toLowerCase().includes(q.toLowerCase()))
      && (tag !== "best" || p.featured));
    return sorts[sort] ? [...r].sort(sorts[sort]) : r;
  }, [cat, q, tag, sort]);
  const title = tag === "best" ? "Favourites" : categories.find((c) => c.slug === cat)?.name || "Full Catalog";
  return (
    <main className="page">
      <div className="container">
        <p className="eyebrow line">Him Craft Studio</p>
        <h1>{title}</h1>
        <div className="toolbar">
          <input className="search" type="search" placeholder="Search the catalog…" aria-label="Search" value={q} onChange={(e) => set("q", e.target.value)} />
          <div className="chips">
            <button className={!cat ? "on" : ""} onClick={() => set("cat", "")}>All</button>
            {categories.map((c) => <button key={c.slug} className={cat === c.slug ? "on" : ""} onClick={() => set("cat", c.slug)}>{c.name}</button>)}
          </div>
          <label className="muted">Sort <select value={sort} onChange={(e) => set("sort", e.target.value)}>
            <option value="">Featured</option><option value="az">Name: A to Z</option>
          </select></label>
        </div>
        <p className="muted count">{list.length} product{list.length !== 1 && "s"}</p>
        {list.length ? <div className="shop-grid">{list.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 70}><ProductCard p={p} /></Reveal>)}</div>
          : <p>No products match your search. Try another category.</p>}
      </div>
    </main>
  );
}
