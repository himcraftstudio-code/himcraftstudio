import { useEffect, useRef, useState } from "react";
import { Link, goSection } from "../router.jsx";
import { site, stats, collections, story, process, values, faqs, contact } from "../data/siteData.js";
import { products, categories } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import Split from "../components/Split.jsx";
import Counter from "../components/Counter.jsx";
import Icon from "../components/Icon.jsx";
import { bg, waLink } from "../utils.js";

// rAF-throttled scroll/resize hook
function useScrollFx(fn) {
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fn); };
    fn();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
}

function Typed({ words }) {
  const [t, setT] = useState(""), [i, setI] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const ms = !del && t === w ? 1700 : del && t === "" ? 350 : del ? 32 : 70;
    const id = setTimeout(() => {
      if (!del && t === w) setDel(true);
      else if (del && t === "") { setDel(false); setI(i + 1); }
      else setT(del ? w.slice(0, t.length - 1) : w.slice(0, t.length + 1));
    }, ms);
    return () => clearTimeout(id);
  }, [t, del, i, words]);
  return <span className="typed">{t}<i className="caret" /></span>;
}

function Hero() {
  const h = site.hero, ref = useRef(null);
  useScrollFx(() => ref.current?.style.setProperty("--py", Math.min(window.scrollY, 800) * 0.12 + "px"));
  return (
    <section className="hero" ref={ref}>
      <div className="blob b1" /><div className="blob b2" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="pill-tag hero-fade" style={{ "--i": 0 }}><span className="dot" />{h.eyebrow}</p>
          <h1 aria-label={h.title.map((l) => l.text).join(" ")}>
            {h.title.map((l, i) => (
              <Split key={l.text} text={l.text} waitReady delay={i * 180} className={"ln" + (l.accent ? " accent" : "")} />
            ))}
          </h1>
          <p className="typed-line hero-fade" style={{ "--i": 3 }}><Typed words={h.typed} /></p>
          <p className="hero-sub hero-fade" style={{ "--i": 4 }}>{h.sub}</p>
          <div className="hero-cta hero-fade" style={{ "--i": 5 }}>
            <Link to="/shop" className="btn" data-mag>Browse the Catalog <Icon name="arrow" size={18} /></Link>
            <a className="btn wa" data-mag href={waLink("Hi Him Craft Studio! I'd like to place an order.")} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} /> Order on WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-visual hero-fade" style={{ "--i": 2 }}>
          <div className="arch"><span style={bg(h.image)} /></div>
          <div className="chip c1"><b>100%</b><small>Handmade, never mass produced</small></div>
          <div className="chip c2"><Icon name="palette" size={20} /> Made to order</div>
          <svg className="seal" viewBox="0 0 120 120" aria-hidden="true">
            <defs><path id="circ" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" /></defs>
            <text><textPath href="#circ" textLength="276" lengthAdjust="spacing">HANDMADE WITH LOVE • HIM CRAFT STUDIO • </textPath></text>
            <circle cx="60" cy="60" r="20" className="seal-c" /><path d="M60 69s-9-5.500-9-11.500a5 5 0 0 1 9-2.500 5 5 0 0 1 9 2.500c0 6-9 11.500-9 11.500z" className="seal-h" />
          </svg>
        </div>
      </div>
      <button className="scroll-cue hero-fade" style={{ "--i": 7 }} onClick={() => goSection("story")} aria-label="Scroll down"><span /></button>
    </section>
  );
}

function Marquee() {
  const row = site.marquee.concat(site.marquee);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq">{[0, 1].map((g) => <div className="mq-g" key={g}>{row.map((t, i) => <span key={i}>{t}<em>✦</em></span>)}</div>)}</div>
    </div>
  );
}

// ── Stat icons ──
const statIcons = [
  // box / product
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  // hand / heart
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  // grid / categories
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
];

const statSubs = ["Unique handcrafted products", "Every piece, crafted fresh", "Something for every occasion"];

function Stats() {
  return (
    <div className="stats-section">
      <div className="container stats-inner">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} className="stat-card">
            <div className="stat-icon">{statIcons[i]}</div>
            <div className="stat-num">
              <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{statSubs[i]}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ── Picks (product carousel) — placed right after Marquee + Stats ──
function Picks() {
  const track = useRef(null), [cat, setCat] = useState(""), [prog, setProg] = useState(0.25);
  const list = products.filter((p) => !cat || p.category === cat);
  const upd = () => { const t = track.current; if (t) setProg(Math.min(1, (t.scrollLeft + t.clientWidth) / t.scrollWidth)); };
  useEffect(() => { track.current.scrollTo({ left: 0 }); upd(); }, [cat]);
  const go = (d) => track.current.scrollBy({ left: d * 320, behavior: "smooth" });
  return (
    <section className="picks-section" id="catalog">
      <div className="container">
        <Reveal className="row head">
          <div>
            <p className="eyebrow">The catalog</p>
            <Split as="h2" text="Handmade pieces to love" />
          </div>
          <div className="chips">
            <button className={!cat ? "on" : ""} onClick={() => setCat("")}>All</button>
            {categories.map((c) => (
              <button key={c.slug} className={cat === c.slug ? "on" : ""} onClick={() => setCat(c.slug)}>{c.short}</button>
            ))}
          </div>
        </Reveal>
        <div className="track" ref={track} onScroll={upd}>
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 80}><ProductCard p={p} /></Reveal>
          ))}
        </div>
        <div className="track-ctl">
          <div className="tbar"><i style={{ transform: `scaleX(${prog})` }} /></div>
          <button className="arrow" onClick={() => go(-1)} aria-label="Previous"><Icon name="arrow" size={18} className="flip" /></button>
          <button className="arrow" onClick={() => go(1)} aria-label="Next"><Icon name="arrow" size={18} /></button>
          <Link to="/shop" className="link">Full catalog <Icon name="arrow" size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="block" id="story">
      <div className="container about">
        <Reveal className="about-img">
          <div className="polaroid"><span style={bg(story.image)} /></div>
          <span className="tape" />
        </Reveal>
        <div className="about-copy">
          <p className="eyebrow">Our story</p>
          <Split as="h2" text={story.title} />
          <Reveal as="p" delay={200} className="lead">{story.text}</Reveal>
          <Reveal delay={300}>
            <button className="btn" data-mag onClick={() => goSection("craft")}>
              See how it works <Icon name="arrow" size={18} />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Collections() {
  const refs = useRef([]);
  useScrollFx(() => {
    const vh = window.innerHeight;
    refs.current.forEach((el, i) => {
      const nx = refs.current[i + 1];
      if (!el || !nx) return;
      const stick = parseFloat(getComputedStyle(el).top) || 0;
      const p = Math.min(1, Math.max(0, 1 - (nx.getBoundingClientRect().top - stick) / (vh * 0.85)));
      el.style.setProperty("--p", p.toFixed(3));
    });
  });
  return (
    <section className="block tight" id="collections">
      <div className="container">
        <Reveal className="row head">
          <div><p className="eyebrow">Our collections</p><Split as="h2" text="Timeless pieces for every season" /></div>
          <Link to="/shop" className="link">Full catalog <Icon name="arrow" size={16} /></Link>
        </Reveal>
        <div className="stack">
          {collections.map((c, i) => (
            <article key={c.id} ref={(el) => (refs.current[i] = el)} className={"fold tone-" + c.tone + (c.tone === "brand" ? " dark" : "")} style={{ "--i": i }}>
              <div className="fold-copy">
                <span className="fold-num">0{i + 1}</span>
                <p className="eyebrow">{c.name}</p>
                <h3>{c.title}</h3>
                <p className="fold-text">{c.text}</p>
                <ul className="ticks">{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <Link to={`/shop?cat=${c.slug}`} className="btn" data-mag>Explore {c.name.split(" ")[0]} <Icon name="arrow" size={18} /></Link>
              </div>
              <div className="fold-img"><span style={bg(c.image)} /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Craft() {
  const ol = useRef(null);
  useScrollFx(() => {
    const r = ol.current.getBoundingClientRect();
    ol.current.style.setProperty("--lp", Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height)).toFixed(3));
  });
  return (
    <section className="block craft" id="craft">
      <div className="container proc">
        <div className="proc-head">
          <p className="eyebrow">The art of handmade</p>
          <Split as="h2" text="From your idea to your doorstep" />
          <Reveal as="p" delay={200} className="lead">Four simple steps. Real people, real replies, real handmade work.</Reveal>
          <Reveal delay={300}><Link to="/shop" className="btn" data-mag>Browse the catalog <Icon name="arrow" size={18} /></Link></Reveal>
        </div>
        <ol className="steps" ref={ol}>
          <span className="rail"><i /></span>
          {process.map((p) => (
            <Reveal as="li" key={p.n} className="st">
              <span className="num">{p.n}</span>
              <div className="st-card">
                <span className="st-img" style={bg(p.image)} />
                <div><h3>{p.label}</h3><p>{p.text}</p></div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Values() {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
    e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
  };
  return (
    <section className="block tight">
      <div className="container">
        <Reveal className="center head">
          <p className="eyebrow">Why Him Craft Studio</p>
          <Split as="h2" text="Made slowly, made to last" />
        </Reveal>
        <div className="bento">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90} className={"bcard bc" + i} onMouseMove={move}>
              <span className="ico"><Icon name={v.icon} size={26} /></span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="block tight" id="faq">
      <div className="container faq-wrap">
        <div>
          <p className="eyebrow">Good to know</p>
          <Split as="h2" text="Questions, answered" />
        </div>
        <div className="faqs">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60} className={"faq" + (open === i ? " open" : "")}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span><i />
              </button>
              <div className="faq-a"><div><p>{f.a}</p></div></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [state, setState] = useState("idle");
  const submit = async (e) => {
    e.preventDefault();
    const form = e.target, f = Object.fromEntries(new FormData(form));
    const text = `Hi Him Craft Studio! I'm ${f.name} (${f.phone}). I'm interested in: ${f.product}.${f.message ? " " + f.message : ""}`;
    if (!contact.formspree) { window.open(waLink(text), "_blank", "noopener"); setState("sent"); return; }
    setState("sending");
    try {
      const r = await fetch(contact.formspree, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(f) });
      if (r.ok) form.reset();
      setState(r.ok ? "sent" : "error");
    } catch { setState("error"); }
  };
  return (
    <section className="container cta-wrap" id="contact">
      <Reveal className="cta">
        <div className="cta-copy">
          <p className="eyebrow">Get in touch</p>
          <Split as="h2" text="Have a question, or want something custom?" />
          <p className="cta-p">Send us an enquiry and we'll get back to you with pricing, availability and delivery timelines, or message us directly on WhatsApp for the fastest reply.</p>
          <a className="cta-phone" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          <div className="cta-btns">
            <a className="btn wa" data-mag href={waLink("Hi Him Craft Studio!")} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={20} /> Chat on WhatsApp
            </a>
          </div>
        </div>
        <form className="enq-form" onSubmit={submit}>
          <label>Your name<input name="name" required autoComplete="name" /></label>
          <label>Phone number<input name="phone" type="tel" required autoComplete="tel" /></label>
          <label>Product you're interested in
            <select name="product" defaultValue="Something custom">
              <option>Something custom</option>
              {products.map((p) => <option key={p.id}>{p.name}</option>)}
            </select>
          </label>
          <label>Message<textarea name="message" rows="3" placeholder="Colours, size, occasion…" /></label>
          <button className="btn gold" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Send Enquiry"} <Icon name="arrow" size={18} />
          </button>
          {state === "sent" && <p className="form-note ok">{contact.formspree ? "Thank you! We'll get back to you soon." : "Your message is ready in WhatsApp. Just press send."}</p>}
          {state === "error" && <p className="form-note err">Something went wrong. Please message us on WhatsApp instead.</p>}
        </form>
        <i className="ring r1" /><i className="ring r2" />
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Stats />
      <Picks />
      <About />
      <Collections />
      <Craft />
      <Values />
      <FAQ />
      <Contact />
    </main>
  );
}
