import { useEffect, useRef } from "react";

// Word-by-word masked text reveal. waitReady: start after the preloader finishes.
export default function Split({ text, as: T = "span", className = "", delay = 0, waitReady = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current, go = () => el.classList.add("in");
    if (waitReady) {
      if (document.documentElement.classList.contains("ready")) { go(); return; }
      window.addEventListener("ws-ready", go, { once: true });
      return () => window.removeEventListener("ws-ready", go);
    }
    if (!("IntersectionObserver" in window)) { go(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { go(); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [waitReady]);
  return (
    <T ref={ref} className={"split " + className}>
      {text.split(" ").map((w, i) => (
        <span className="w" key={i} aria-hidden="true"><span style={{ transitionDelay: `${delay + i * 80}ms` }}>{w}&nbsp;</span></span>
      ))}
    </T>
  );
}
