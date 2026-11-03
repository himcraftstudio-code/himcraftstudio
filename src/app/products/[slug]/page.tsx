import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import { getProduct, getProducts, getCategory } from "@/lib/catalogue";
import { productEnquiry } from "@/lib/whatsapp";
export function generateStaticParams() { return getProducts().map(p=>({slug:p.slug})); }
export default async function ProductPage({ params }: { params: Promise<{slug:string}> }) {
 const {slug}=await params; const product=getProduct(slug); if(!product) notFound(); const category=getCategory(product.category);
 return <div className="product-detail-page"><Link href="/products" className="back-link"><ArrowLeft size={16}/> Back to all creations</Link><div className="product-detail"><div className="detail-image"><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 800px) 100vw, 55vw"/></div><div className="detail-copy"><span className="eyebrow">{category?.name ?? "HANDMADE CREATION"}</span><h1>{product.name}</h1><p className="detail-price">{product.priceLabel}</p><p className="detail-description">{product.description}</p><div className="detail-points"><span><Heart size={16}/> Thoughtfully handmade</span><span>✦ Custom colours may be available</span><span>✦ Made to order — ask about timelines</span></div><a href={productEnquiry(product.name, `https://himcraftstudio.com/products/${product.slug}`)} target="_blank" rel="noreferrer" className="button button-dark detail-cta"><MessageCircle size={18}/> Enquire about this creation</a><p className="detail-small">No online checkout. We'll discuss details, pricing and availability with you directly.</p></div></div></div>;
}