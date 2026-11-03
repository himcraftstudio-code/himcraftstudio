import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, Leaf, Mountain, Scissors, Sparkles } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/catalogue";
import ProductCard from "@/components/product-card";
import WhatsAppLink from "@/components/whatsapp-link";

const values = [{icon:Heart,title:"Handcrafted with Love",copy:"Every piece made stitch by stitch"},{icon:Leaf,title:"Thoughtfully Made",copy:"A softer, slower way to create"},{icon:Mountain,title:"Inspired by the Himalayas",copy:"Rooted in warmth and nature"}];

export default function HomePage(){
 const categories=getCategories().slice(0,4);
 const featured=getFeaturedProducts().slice(0,4);
 return <div className="ws-home">
  <section className="ws-hero">
   <div className="ws-hero-photo"><Image src="/images/hero/himalayan-woollens.svg" alt="Illustrated Himalayan winter landscape and a woman wrapped in a handmade woollen shawl" fill priority sizes="100vw"/></div>
   <div className="ws-hero-wash"/>
   <div className="ws-hero-copy"><div className="ws-kicker"><span/> PREMIUM HANDMADE WOOLLENS <span/></div><h1>Wrap Yourself<br/>in <em>Warmth.</em></h1><p className="ws-script">Crafted by hand, inspired by nature.</p><Link href="/products" className="ws-pill-button">Explore Collection <ArrowRight size={16}/></Link>
    <div className="ws-values">{values.map(({icon:Icon,title,copy})=><div key={title}><Icon size={24}/><strong>{title}</strong><small>{copy}</small></div>)}</div>
   </div>
   <div className="ws-play-note"><span className="ws-play"><span/></span><small>OUR STORY<br/>MADE WITH LOVE</small></div>
   <div className="ws-hero-caption">HIMACHAL PRADESH · INDIA</div>
   <div className="ws-hero-wave"/>
  </section>
  <section className="ws-collections ws-section">
   <div className="ws-section-top"><div><div className="ws-kicker"><span/> OUR COLLECTIONS <span/></div><h2>Timeless Pieces for <em>Every Season</em></h2></div><Link href="/products" className="ws-arrow-link">View All Collections <ArrowUpRight size={15}/></Link></div>
   <div className="ws-category-grid">{categories.map((cat,i)=><Link href={`/products/category/${cat.slug}`} className={`ws-category ws-cat-${i+1}`} key={cat.slug}><div className="ws-category-image"><Image src={cat.image} alt={cat.name} fill sizes="(max-width:700px) 46vw, 24vw"/><span>{cat.name} <ArrowRight size={14}/></span></div></Link>)}</div>
  </section>
  <section className="ws-story">
   <div className="ws-story-visual"><div className="ws-story-photo"><Image src="/images/hero/craft-detail.svg" alt="Handmade yarn craft detail illustration" fill sizes="45vw"/></div><span className="ws-yarn-ball">✳</span><span className="ws-botanical">❧</span></div>
   <div className="ws-story-copy"><div className="ws-kicker"><span/> OUR STORY <span/></div><h2>Crafted by Hands,<br/><em>Cherished by You.</em></h2><p>At HimCraft Studio, we celebrate the timeless art of handmade creation. Each piece is thoughtfully crafted with patience, care and a love for beautiful details — keeping the warmth of tradition alive.</p><Link href="/about" className="ws-pill-button">Discover Our Story <ArrowRight size={15}/></Link></div>
   <div className="ws-story-points">{values.map(({icon:Icon,title,copy})=><div key={title}><Icon size={28}/><p><strong>{title}</strong><small>{copy}</small></p></div>)}</div>
  </section>
  <section className="ws-process ws-section"><div className="ws-kicker"><span/> THE ART OF HANDMADE <span/></div><h2>From a little idea to <em>something lovely.</em></h2><div className="ws-process-grid"><article><div className="ws-process-art ws-process-one"><Leaf size={46}/></div><strong>Thoughtful Materials</strong><small>Chosen with care</small></article><b>→</b><article><div className="ws-process-art ws-process-two"><Scissors size={46}/></div><strong>Made by Hand</strong><small>Every stitch matters</small></article><b>→</b><article><div className="ws-process-art ws-process-three"><Heart size={46}/></div><strong>Made for You</strong><small>Created to be cherished</small></article></div></section>
  <section className="ws-bestsellers ws-section"><div className="ws-section-top"><div><div className="ws-kicker"><span/> MADE WITH LOVE <span/></div><h2>Loved by Our <em>Community</em></h2></div><Link href="/products" className="ws-arrow-link">Shop All <ArrowUpRight size={15}/></Link></div><div className="product-grid ws-product-grid">{featured.map(product=><ProductCard key={product.id} product={product}/>)}</div></section>
  <section className="ws-quote-news"><div className="ws-quote"><div className="ws-quote-mark">“</div><blockquote>Beautiful things take time. The best things are made with heart.</blockquote><span>THE HIMCRAFT STUDIO PROMISE</span></div><div className="ws-news"><div className="ws-kicker">A LITTLE NOTE FROM OUR STUDIO</div><h2>Stay warm.<br/><em>Stay inspired.</em></h2><p>Follow our latest creations, new collections and little moments from the studio.</p><WhatsAppLink message="Hello HimCraft Studio! Please keep me updated about your latest handmade creations." label="Stay in touch" className="ws-news-button"/></div></section>
 </div>
}