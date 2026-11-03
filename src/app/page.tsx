import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Heart, Leaf, MessageCircle, Sparkles } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/catalogue";
import ProductCard from "@/components/product-card";
import WhatsAppLink from "@/components/whatsapp-link";

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts();

  return (
    <>
      <section className="hc-hero">
        <div className="hc-hero-copy">
          <span className="hc-kicker"><span /> THE ART OF SLOW-MADE THINGS</span>
          <h1>Objects with<br />a little more <em>heart.</em></h1>
          <p className="hc-hero-intro">Handcrafted crochet pieces, thoughtful gifts and everyday keepsakes — made stitch by stitch, with time and care.</p>
          <div className="hc-hero-actions">
            <Link href="/products" className="hc-button hc-button-dark">Explore the collection <ArrowUpRight size={17}/></Link>
            <Link href="/about" className="hc-quiet-link">The story behind the stitches <ArrowDownRight size={16}/></Link>
          </div>
          <div className="hc-hero-foot"><span>01 — HANDMADE</span><span>02 — THOUGHTFUL</span><span>03 — ONE OF A KIND</span></div>
        </div>
        <div className="hc-hero-visual">
          <div className="hc-hero-main-image"><Image src="/images/hero/hero-crochet.svg" alt="Handmade crochet-inspired floral artwork" fill priority sizes="(max-width: 800px) 100vw, 54vw"/></div>
          <div className="hc-floating-note"><span className="hc-note-icon"><Heart size={17}/></span><span>Made slowly.<br/><em>Loved forever.</em></span></div>
          <div className="hc-vertical-caption">HIMCRAFT STUDIO · HANDMADE IN EVERY DETAIL</div>
        </div>
        <div className="hc-scroll-cue"><span>SCROLL TO EXPLORE</span><span className="hc-scroll-line"/></div>
      </section>

      <section className="hc-intro-band">
        <span>NOT FACTORY-MADE.</span>
        <p>Made with intention. <em>Made to mean something.</em></p>
        <span>ALWAYS A LITTLE DIFFERENT.</span>
      </section>

      <section className="hc-section hc-collections">
        <div className="hc-section-top">
          <div><span className="hc-kicker">A WORLD OF LITTLE DETAILS</span><h2>Find your kind<br/>of <em>lovely.</em></h2></div>
          <p>From cheerful blooms to cosy companions, explore pieces that bring warmth to everyday moments.</p>
        </div>
        <div className="hc-collection-grid">
          {categories.slice(0, 4).map((cat, index) => (
            <Link href={`/products/category/${cat.slug}`} className={`hc-collection-card hc-collection-${index + 1}`} key={cat.slug}>
              <div className="hc-collection-image"><Image src={cat.image} alt={cat.name} fill sizes="(max-width: 700px) 80vw, 30vw"/><span className="hc-collection-arrow"><ArrowUpRight size={20}/></span></div>
              <div className="hc-collection-meta"><span>0{index + 1}</span><h3>{cat.name}</h3></div>
              <p>{cat.description}</p>
            </Link>
          ))}
        </div>
        <div className="hc-center-link"><Link href="/products" className="hc-button hc-button-outline">See all collections <ArrowRight size={16}/></Link></div>
      </section>

      <section className="hc-featured-section">
        <div className="hc-section hc-featured-inner">
          <div className="hc-section-top hc-featured-top">
            <div><span className="hc-kicker">THE PIECES WE LOVE</span><h2>Small joys.<br/><em>Big feelings.</em></h2></div>
            <div className="hc-featured-side"><p>A few favourites from the studio. Each one is an invitation to gift a little joy — or keep it for yourself.</p><Link href="/products" className="hc-quiet-link">Browse all creations <ArrowUpRight size={16}/></Link></div>
          </div>
          <div className="product-grid hc-product-grid">{featured.slice(0, 4).map((product) => <ProductCard key={product.id} product={product}/>)}</div>
        </div>
      </section>

      <section className="hc-manifesto">
        <div className="hc-manifesto-image"><Image src="/images/hero/story-craft.svg" alt="Yarn and crochet craft illustration" fill sizes="(max-width: 800px) 100vw, 48vw"/></div>
        <div className="hc-manifesto-copy">
          <span className="hc-kicker">A NOTE FROM THE STUDIO</span>
          <h2>There is beauty<br/>in taking <em>your time.</em></h2>
          <p>We love the little imperfections, the texture of every loop and the feeling of making something by hand. HimCraft Studio is a home for thoughtful creations that carry a little more meaning.</p>
          <Link href="/about" className="hc-button hc-button-dark">Get to know our story <ArrowUpRight size={17}/></Link>
          <span className="hc-manifesto-signoff">With love, from HimCraft Studio <Heart size={14}/></span>
        </div>
      </section>

      <section className="hc-process hc-section">
        <div className="hc-process-heading"><span className="hc-kicker">A LITTLE SOMETHING, MADE FOR YOU</span><h2>From our hands<br/>to <em>your home.</em></h2></div>
        <div className="hc-process-steps">
          <article><span>01</span><Sparkles size={22}/><h3>Find your inspiration</h3><p>Explore the collection or share an idea for something personal.</p></article>
          <article><span>02</span><Heart size={22}/><h3>Made with care</h3><p>We discuss the details, colours and finish for your special piece.</p></article>
          <article><span>03</span><Leaf size={22}/><h3>Make it yours</h3><p>Your handmade creation is ready to be gifted, displayed or treasured.</p></article>
        </div>
      </section>

      <section className="hc-custom-cta">
        <div><span className="hc-kicker">HAVE A LITTLE IDEA?</span><h2>Let's make it<br/><em>real.</em></h2></div>
        <div className="hc-custom-copy"><p>A favourite colour, a thoughtful gift, a tiny detail you've been imagining. Tell us about it — custom enquiries are always welcome.</p><WhatsAppLink message="Hello HimCraft Studio! I'd love to discuss a custom handmade creation." label="Start a custom enquiry" className="hc-button hc-button-light"/><span>NO CART. NO RUSH. JUST A CONVERSATION.</span></div>
        <div className="hc-cta-orbit">H<br/><span>♡</span></div>
      </section>
    </>
  );
}
