import Link from "next/link";
import { getCategories, getProducts } from "@/lib/catalogue";
import ProductCard from "@/components/product-card";
export const metadata = { title: "Shop the Collection" };
export default function ProductsPage() {
 const categories=getCategories(), products=getProducts();
 return <div className="catalogue-page"><div className="page-intro"><span className="eyebrow">THE HIMCRAFT COLLECTION</span><h1>Little things, made with love.</h1><p>Explore our handmade crochet and woollen creations. Each piece is thoughtfully made and can be customised just for you.</p></div><div className="catalogue-layout"><aside className="category-filter"><h3>Categories</h3><Link href="/products" className="active">All creations <span>{products.length}</span></Link>{categories.map(c=><Link key={c.slug} href={`/products/category/${c.slug}`}>{c.name}</Link>)}</aside><div className="catalogue-content"><div className="catalogue-topline"><span>{products.length} creations</span><span>Each one made with care ♡</span></div><div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div></div></div></div>;
}