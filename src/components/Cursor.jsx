import { useEffect, useRef } from "react";

// Simple small dot cursor that follows the mouse smoothly.
export default function Cursor() {
  const el = useRef(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let tx = -200, ty = -200;
    let cx = -200, cy = -200;
    let raf = 0;

    const cursor = el.current;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (cursor.style.opacity === "0" || cursor.style.opacity === "") {
        cx = tx; cy = ty; // snap on first move, no lag
        cursor.style.opacity = "1";
      }
      // change color on clickable elements
      const isClickable = !!e.target.closest("a, button, [role='button'], input, select, textarea");
      cursor.classList.toggle("active", isClickable);
    };

    const onLeave = () => { cursor.style.opacity = "0"; };

    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor" ref={el} aria-hidden="true" />;
}
