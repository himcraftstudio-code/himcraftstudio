import { useEffect, useRef } from "react";

// Fades/slides children in when they scroll into view. delay in ms for staggering.
export default function Reveal({ as: T = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <T ref={ref} className={"reveal " + className} style={{ "--d": delay + "ms" }} {...rest}>{children}</T>;
}
