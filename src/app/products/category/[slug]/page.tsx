import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts, getCategory } from "@/lib/catalogue";
import ProductCard from "@/components/product-card";
export function generateStaticParams(){return getCategories().map(c=>({slug:c.slug}));}
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params, category=getCategory(slug); if(!category) notFound();
 const products=getProducts().filter(p=>p.category===slug);
 return <div className="catalogue-page"><div className="page-intro"><span className="eyebrow">THE HIMCRAFT COLLECTION</span><h1>{category.name}</h1><p>{category.description}</p></div><div className="catalogue-layout"><aside className="category-filter"><h3>Categories</h3><Link href="/products">All creations</Link>{getCategories().map(c=><Link key={c.slug} href={`/products/category/${c.slug}`} className={c.slug===slug?"active":""}>{c.name}</Link>)}</aside><div className="catalogue-content"><div className="catalogue-topline"><span>{products.length} creations</span><span>Each one made with care ♡</span></div>{products.length?<div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty-state"><h2>Something lovely is on its way.</h2><p>We're adding creations to this collection.</p><Link href="/products" className="button button-dark">View all creations</Link></div>}</div></div></div>;
}