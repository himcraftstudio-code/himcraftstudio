import { useEffect, useRef } from "react";

// Fades/slides children in when they scroll into view (or immediately if already visible).
export default function Reveal({ as: T = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    el.classList.remove("in");

    // Respect reduced-motion: skip animation entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }

    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use rAF so the browser has painted the initial opacity:0 state
          // before we add "in", ensuring the CSS transition actually runs.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.classList.add("in");
            });
          });
          io.disconnect();
        }
      },
      // rootMargin "1px" on the bottom means elements already on screen
      // when mounted will fire immediately rather than needing to scroll.
      { threshold: 0, rootMargin: "0px 0px 1px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <T ref={ref} className={"reveal " + className} style={{ "--d": delay + "ms" }} {...rest}>
      {children}
    </T>
  );
}
