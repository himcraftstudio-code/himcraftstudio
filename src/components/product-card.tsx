import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/catalogue";
import { productEnquiry } from "@/lib/whatsapp";
import { MessageCircle, ArrowUpRight } from "lucide-react";
export default function ProductCard({ product }: { product: Product }) {
  return <article className="product-card"><Link href={`/products/${product.slug}`} className="product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 25vw"/>{product.madeToOrder && <span className="made-badge">Made to order</span>}<span className="image-arrow"><ArrowUpRight size={18}/></span></Link><div className="product-info"><div><Link href={`/products/${product.slug}`} className="product-name">{product.name}</Link><p>{product.priceLabel}</p></div><a className="quick-enquiry" href={productEnquiry(product.name, `/products/${product.slug}`)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${product.name}`}><MessageCircle size={18}/></a></div></article>;
}