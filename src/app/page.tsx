import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, Leaf, Mountain, Scissors, Sparkles, Flower2, HandHeart, Recycle, Star } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/catalogue";
import ProductCard from "@/components/product-card";
import WhatsAppLink from "@/components/whatsapp-link";
import "./reference-home.css";

const values=[{icon:Leaf,title:"100% Natural Wool",copy:"Thoughtfully chosen materials"},{icon:Heart,title:"Handmade with Love",copy:"Every stitch made with care"},{icon:Mountain,title:"Inspired by Himalayas",copy:"Rooted in nature and warmth"}];
const process=[{title:"Pure Wool",copy:"From Nature",image:"https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=360&q=85",alt:"Sheep grazing in a green meadow"},{title:"Careful Preparation",copy:"Every fibre matters",image:"https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=360&q=85",alt:"Natural wool and textile materials"},{title:"Skilled Knitting",copy:"Made stitch by stitch",image:"https://images.unsplash.com/photo-1604881988758-f76ad2f7adeed?auto=format&fit=crop&w=360&q=85",alt:"Hands creating handmade textiles"},{title:"Timeless Creation",copy:"Made to be cherished",image:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=360&q=85",alt:"Folded handmade knitwear"}];

export default function HomePage(){
 const categories=getCategories().slice(0,4);
 const featured=getFeaturedProducts().slice(0,4);
 return <div className="ws-home">
  <div className="ws-topline"><Leaf size={12}/> Free Shipping on Orders Above ₹2,000 <span/> Handmade with Love ♡</div>
  <section className="ws-hero">
   <div className="ws-hero-photo"/><div className="ws-hero-wash"/>
   <div className="ws-hero-copy ws-reveal"><div className="ws-kicker"><span/> PREMIUM HANDMADE WOOLLENS <span/></div><h1>Wrap Yourself<br/>in <em>Warmth.</em></h1><p className="ws-script">Crafted by Hand, Inspired by Nature</p><Link href="/products" className="ws-pill-button">Explore Collection <ArrowRight size={16}/></Link>
    <div className="ws-values">{values.map(({icon:Icon,title,copy})=><div key={title}><Icon size={23}/><strong>{title}</strong><small>{copy}</small></div>)}</div>
   </div>
   <div className="ws-play-note"><span className="ws-play"><span/></span><small>OUR STORY<br/>PLAY VIDEO</small></div><div className="ws-hero-wave"/>
  </section>
  <section className="ws-collections ws-section"><div className="ws-section-top"><div><div className="ws-kicker"><span/> OUR COLLECTIONS <span/></div><h2>Timeless Pieces for Every Season</h2></div><Link href="/products" className="ws-arrow-link">View All Collections <ArrowUpRight size={15}/></Link></div>
   <div className="ws-category-grid">{categories.map((cat,i)=><Link href={`/products/category/${cat.slug}`} className={`ws-category ws-cat-${i+1}`} key={cat.slug}><div className="ws-category-image"><Image src={cat.image} alt={cat.name} fill sizes="(max-width:700px) 46vw, 24vw"/><span>{cat.name} <ArrowRight size={14}/></span></div></Link>)}</div>
  </section>
  <section className="ws-story"><div className="ws-story-visual"><div className="ws-story-photo"><Image src="/images/hero/craft-detail.svg" alt="Close-up of handmade wool craft" fill sizes="45vw"/></div><span className="ws-yarn-ball">✳</span><span className="ws-botanical">❧</span></div>
   <div className="ws-story-copy"><div className="ws-kicker"><span/> OUR STORY <span/></div><h2>Crafted by Hands,<br/><em>Cherished by You.</em></h2><p>At HimCraft Studio, we celebrate the timeless art of handmade creation. Each piece is thoughtfully crafted with patience, care and a love for beautiful details — keeping the warmth of tradition alive.</p><Link href="/about" className="ws-pill-button">Discover Our Story <ArrowRight size={15}/></Link></div>
   <div className="ws-story-points">{[{icon:HandHeart,title:"Handcrafted with Love",copy:"Every piece made by hand"},{icon:Recycle,title:"Sustainable & Eco-Friendly",copy:"A thoughtful choice, always"},{icon:Flower2,title:"Supporting Artisan Communities",copy:"Keeping craft traditions alive"}].map(({icon:Icon,title,copy})=><div key={title}><Icon size={28}/><p><strong>{title}</strong><small>{copy}</small></p></div>)}</div>
  </section>
  <section className="ws-process ws-section"><div className="ws-kicker"><span/> THE ART OF HANDMADE <span/></div><h2>From Pure Wool to <em>Wearable Warmth</em></h2><div className="ws-process-grid">{process.map((step,i)=><><article key={step.title}><div className="ws-process-art"><img src={step.image} alt={step.alt}/></div><strong>{step.title}</strong><small>{step.copy}</small></article>{i!==process.length-1&&<b key={step.title+"-arrow"}>→</b>}</>)}</div></section>
  <section className="ws-bestsellers ws-section"><div className="ws-section-top"><div><div className="ws-kicker"><span/> BEST SELLERS <span/></div><h2>Loved by Our <em>Community</em></h2></div><Link href="/products" className="ws-arrow-link">Shop All <ArrowUpRight size={15}/></Link></div><div className="product-grid ws-product-grid">{featured.map(product=><ProductCard key={product.id} product={product}/>)}</div></section>
  <section className="ws-quote-news"><div className="ws-quote"><div className="ws-quote-mark">“</div><blockquote>Absolutely love my handmade piece! The quality is exceptional and so warm. A true handmade treasure.</blockquote><div className="ws-reviewer"><span className="ws-avatar">P</span><strong>Our happy customers</strong><span className="ws-stars"><Star/><Star/><Star/><Star/><Star/></span></div></div><div className="ws-news"><div className="ws-kicker">A LITTLE NOTE FROM OUR STUDIO</div><h2>Stay Warm. Stay Inspired.</h2><p>Get updates on new arrivals, thoughtful gifting ideas and stories from our handmade studio.</p><WhatsAppLink message="Hello HimCraft Studio! Please keep me updated about your latest handmade creations." label="Subscribe to updates" className="ws-news-button"/></div></section>
 </div>;
}
