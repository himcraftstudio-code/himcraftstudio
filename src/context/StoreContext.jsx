import { createContext, useContext, useEffect, useRef, useState } from "react";
const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);
const load = () => { try { return JSON.parse(localStorage.getItem("ws-wish")) || []; } catch { return []; } };
export const haptic = (ms = 8) => { try { navigator.vibrate?.(ms); } catch {} };

export function StoreProvider({ children }) {
  const [wish, setWish] = useState(load);
  const [toast, setToast] = useState(null);
  const timer = useRef(0);
  useEffect(() => { try { localStorage.setItem("ws-wish", JSON.stringify(wish)); } catch {} }, [wish]);
  const notify = (msg) => { clearTimeout(timer.current); setToast({ id: Date.now(), msg }); timer.current = setTimeout(() => setToast(null), 2200); };
  const toggleWish = (id) => {
    const has = wish.includes(id);
    haptic(10);
    setWish((w) => (has ? w.filter((x) => x !== id) : [...w, id]));
    notify(has ? "Removed from wishlist" : "Saved to wishlist");
  };
  return <Ctx.Provider value={{ wish, toggleWish, toast, notify }}>{children}</Ctx.Provider>;
}
