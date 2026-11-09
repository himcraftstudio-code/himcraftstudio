import { useEffect, useState } from "react";

// Percentage preloader. Adds "ready" to <html> when finished so hero animations can start.
export default function Preloader() {
  const [n, setN] = useState(0), [done, setDone] = useState(false), [gone, setGone] = useState(false);
  useEffect(() => {
    let raf = 0, timer = 0;
    const finish = () => {
      setN(100); setDone(true);
      document.documentElement.classList.add("ready");
      window.dispatchEvent(new Event("ws-ready"));
      timer = setTimeout(() => setGone(true), 1100);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return () => clearTimeout(timer); }
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1400);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 2))));
      p < 1 ? (raf = requestAnimationFrame(tick)) : finish();
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);
  if (gone) return null;
  return (
    <div className={"pre" + (done ? " done" : "")} aria-hidden="true">
      <div className="pre-in">
        <span className="pre-mark">◎</span>
        <p className="pre-name">Himcraftstudio</p>
        <p className="pre-n">{n}<small>%</small></p>
        <div className="pre-bar"><i style={{ "--n": n / 100 }} /></div>
      </div>
    </div>
  );
}
