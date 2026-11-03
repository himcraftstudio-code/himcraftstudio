import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Leaf, Sparkles, WandSparkles } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/catalogue";
import ProductCard from "@/components/product-card";
import WhatsAppLink from "@/components/whatsapp-link";

export default function HomePage() {
  const categories = getCategories().slice(0, 4);
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <div className="hm-home">
      <section className="hm-hero">
        <div className="hm-hero-copy hm-reveal">
          <div className="hm-eyebrow"><span className="hm-eyebrow-dot" /> THE HANDMADE EDIT · HIMACHAL, INDIA</div>
          <h1>Little things.<br/><em>Lovely</em> feelings.</h1>
          <p>Thoughtful crochet and woollen pieces, made slowly by hand. A little colour, a little comfort, and a whole lot of heart.</p>
          <div className="hm-hero-actions">
            <Link href="/products" className="hm-btn hm-btn-primary">Explore the collection <ArrowUpRight size={17}/></Link>
            <Link href="/about" className="hm-text-link">Meet the maker <ArrowRight size={16}/></Link>
          </div>
          <div className="hm-proof"><span><Heart size={15}/> Made by hand</span><i/><span><Leaf size={15}/> Made with care</span></div>
        </div>
        <div className="hm-hero-art hm-reveal hm-delay-1">
          <div className="hm-art-backdrop"/>
          <div className="hm-main-art"><Image src="/images/hero/hero-premium.svg" alt="Illustrated handmade crochet flower arrangement in soft pastel colours" fill priority sizes="(max-width: 760px) 100vw, 55vw"/></div>
          <div className="hm-art-tag"><span>01 / 04</span><strong>Made to make<br/>you smile.</strong></div>
          <div className="hm-stamp"><span>HIMCRAFT</span><Heart size={17} fill="currentColor"/><span>HANDMADE</span></div>
        </div>
        <div className="hm-hero-bottom"><span>SCROLL A LITTLE</span><ArrowDown size={15}/><span className="hm-hero-bottom-line"/></div>
      </section>

      <section className="hm-marquee" aria-label="HimCraft Studio values"><div>MADE SLOWLY <b>✳</b> MADE WITH LOVE <b>✳</b> MADE TO BE KEPT <b>✳</b> MADE SLOWLY <b>✳</b> MADE WITH LOVE <b>✳</b></div></section>

      <section className="hm-intro hm-section">
        <div className="hm-intro-label"><span>01</span><span>THE HIMCRAFT FEELING</span></div>
        <div className="hm-intro-content"><h2>Not just handmade.<br/><em>Heart-made.</em></h2><p>We believe the best things are made with time, care and a little imagination. Every stitch tells a story — and every piece is created to bring a small moment of joy into your everyday.</p><Link href="/about" className="hm-under-link">A little more about us <ArrowUpRight size={16}/></Link></div>
        <div className="hm-intro-orb"><Sparkles size={25}/><span>Slow made<br/>with love</span></div>
      </section>

      <section className="hm-collections hm-section">
        <div className="hm-section-heading"><div><div className="hm-eyebrow">02 · FIND YOUR FAVOURITE</div><h2>A little world<br/>of <em>wonder.</em></h2></div><p>Explore feel-good pieces for gifting, collecting and making your everyday a little more special.</p></div>
        <div className="hm-category-grid">
          {categories.map((cat, index) => <Link href={`/products/category/${cat.slug}`} className={`hm-category hm-category-${index+1}`} key={cat.slug}><div className="hm-category-art"><Image src={cat.image} alt={cat.name} fill sizes="(max-width: 700px) 45vw, 25vw"/><span className="hm-category-index">0{index+1}</span><span className="hm-category-arrow"><ArrowUpRight size={19}/></span></div><div className="hm-category-title"><h3>{cat.name}</h3><ArrowRight size={16}/></div><p>{cat.description}</p></Link>)}
        </div>
        <div className="hm-center"><Link href="/products" className="hm-btn hm-btn-outline">View all creations <ArrowUpRight size={16}/></Link></div>
      </section>

      <section className="hm-featured hm-section">
        <div className="hm-section-heading"><div><div className="hm-eyebrow">03 · FROM THE STUDIO</div><h2>Made to be<br/><em>treasured.</em></h2></div><div className="hm-featured-aside"><p>Meet a few of our favourite creations. Each one is lovingly handmade and can be made just for you.</p><Link href="/products" className="hm-under-link">Explore everything <ArrowUpRight size={16}/></Link></div></div>
        <div className="product-grid hm-product-grid">{featured.map((product) => <ProductCard key={product.id} product={product}/>)}</div>
      </section>

      <section className="hm-story">
        <div className="hm-story-image"><Image src="/images/hero/craft-detail.svg" alt="Soft pastel handmade crochet texture illustration" fill sizes="(max-width: 760px) 100vw, 50vw"/><span className="hm-image-caption">A LITTLE IMPERFECT. A LOT OF LOVE.</span></div>
        <div className="hm-story-copy"><div className="hm-eyebrow">04 · THE BEAUTY OF SLOW</div><h2>Made by hand.<br/><em>Made to matter.</em></h2><p>In a world that moves fast, we choose to slow down. To enjoy the colours, the textures and the tiny details. HimCraft Studio is our little corner for creations that feel personal, joyful and full of warmth.</p><Link href="/about" className="hm-btn hm-btn-primary">Discover our story <ArrowUpRight size={16}/></Link><div className="hm-handwritten">A little love in every loop <Heart size={15}/></div></div>
      </section>

      <section className="hm-made hm-section">
        <div className="hm-made-heading"><div className="hm-eyebrow">05 · YOUR IDEA, OUR HANDS</div><h2>Something special<br/>starts with <em>hello.</em></h2><p>Have a colour in mind, a gift to make or a tiny idea you'd love to bring to life?</p></div>
        <div className="hm-steps"><article><span>01</span><div className="hm-step-icon"><WandSparkles size={21}/></div><h3>Tell us your idea</h3><p>Share what you have in mind, from colours to the occasion.</p></article><article><span>02</span><div className="hm-step-icon"><Heart size={21}/></div><h3>Made with care</h3><p>We work through the little details and craft it by hand.</p></article><article><span>03</span><div className="hm-step-icon"><Sparkles size={21}/></div><h3>Made just for you</h3><p>Your one-of-a-kind creation is ready to be cherished.</p></article></div>
      </section>

      <section className="hm-contact-band"><div className="hm-contact-flower">✳</div><div><div className="hm-eyebrow">LET'S MAKE SOMETHING LOVELY</div><h2>Your idea deserves<br/><em>a little handmade magic.</em></h2></div><div className="hm-contact-action"><p>Tell us what you're dreaming up. We'd love to hear from you.</p><WhatsAppLink message="Hello HimCraft Studio! I'd love to discuss a custom handmade creation." label="Start a conversation" className="hm-btn hm-btn-light"/><span>PERSONAL ENQUIRIES · CUSTOM ORDERS WELCOME</span></div></section>
    </div>
  );
}
