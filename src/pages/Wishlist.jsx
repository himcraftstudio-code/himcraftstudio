import { Link } from "../router.jsx";
import { products } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Wishlist() {
  const { wish } = useStore();
  const list = products.filter((p) => wish.includes(p.id));
  return (
    <main className="page">
      <div className="container">
        <h1>Your wishlist</h1>
        {list.length ? <div className="shop-grid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          : <><p className="muted wl">Tap the heart on any product to save it here.</p><Link to="/shop" className="btn">Browse products</Link></>}
      </div>
    </main>
  );
}
