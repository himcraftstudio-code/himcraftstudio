// Tiny hash router (no dependencies). URLs look like  index.html#/shop?cat=hats
import { createContext, useContext, useEffect, useState } from "react";

const parse = () => {
  const h = window.location.hash.slice(1) || "/";
  const i = h.indexOf("?");
  return i < 0 ? { path: h, search: "" } : { path: h.slice(0, i), search: h.slice(i + 1) };
};
const Ctx = createContext({ path: "/", search: "" });

export function Router({ children }) {
  const [loc, setLoc] = useState(parse);
  useEffect(() => {
    const on = () => setLoc(parse());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return <Ctx.Provider value={loc}>{children}</Ctx.Provider>;
}

export const useLocation = () => useContext(Ctx);
export const useNavigate = () => (to) => { window.location.hash = to; };

export function useSearchParams() {
  const { path, search } = useLocation();
  const set = (p) => { const s = p.toString(); window.location.hash = path + (s ? "?" + s : ""); };
  return [new URLSearchParams(search), set];
}

export function Link({ to, children, ...rest }) {
  return <a href={"#" + to} {...rest}>{children}</a>;
}

export function NavLink({ to, end, className, children, ...rest }) {
  const { path, search } = useLocation();
  const [bp, bq] = to.split("?");
  const isActive = bq ? path === bp && search === bq : end ? path === bp : path === bp && !search.includes("tag=");
  return <Link to={to} className={typeof className === "function" ? className({ isActive }) : className} {...rest}>{children}</Link>;
}

// Scroll to a page section; "story" and "craft" live on the home page.
export function goSection(id) {
  const run = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const onHome = (window.location.hash.slice(1) || "/").split("?")[0] === "/";
  if (onHome) run();
  else { window.location.hash = "/"; setTimeout(run, 400); }
}
