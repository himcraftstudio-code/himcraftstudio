import { useEffect, useRef } from "react";
import { useLocation, Link } from "./router.jsx";
import { site } from "./data/siteData.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFab from "./components/WhatsAppFab.jsx";
import Preloader from "./components/Preloader.jsx";
import TabBar from "./components/TabBar.jsx";
import { useStore } from "./context/StoreContext.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Wishlist from "./pages/Wishlist.jsx";

function Page({ path }) {
  const m = path.match(/^\/product\/([^/]+)$/);
  if (path === "/") return <Home />;
  if (path === "/shop") return <Shop />;
  if (m) return <Product slug={decodeURIComponent(m[1])} />;
  if (path === "/wishlist") return <Wishlist />;
  return <main className="page"><div className="container"><h1>Page not found</h1><Link to="/" className="btn">Go home</Link></div></main>;
}

export default function App() {
  const { path } = useLocation();
  const bar = useRef(null);
  const { toast } = useStore();
  useEffect(() => window.scrollTo(0, 0), [path]);

  // scroll progress bar
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    }); };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // magnetic buttons: any element with data-mag follows the cursor slightly
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cur = null;
    const move = (e) => {
      const el = e.target.closest?.("[data-mag]") || null;
      if (cur && cur !== el) cur.style.translate = "";
      cur = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.32}px`;
    };
    document.addEventListener("pointermove", move);
    return () => document.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <Preloader />
      <div className="progress"><i ref={bar} /></div>
      <div className="announce">{site.announcement}</div>
      <Header path={path} />
      <Page path={path} />
      <Footer />
      <WhatsAppFab />
      {!path.startsWith("/product/") && <TabBar path={path} />}
      {toast && <div className="toast" key={toast.id} role="status">{toast.msg}</div>}
    </>
  );
}
