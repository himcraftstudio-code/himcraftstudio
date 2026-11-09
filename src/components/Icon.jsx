const P = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.600-7 10-7 10z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  leaf: "M5 19C5 10 10 5 19 5c0 9-5 14-14 14zM5 19l8-8",
  mountain: "M3 19l6-11 4 7 3-4 5 8zM9 8l-1.500 2.500",
  play: "M8 5v14l11-7z",
  hand: "M12 15s-4-2.500-4-5.200A2.200 2.200 0 0 1 12 8.500a2.200 2.200 0 0 1 4 1.300C16 12.500 12 15 12 15zM3 14l4 1.500 5 2 6-2 3-2.500",
  sprout: "M12 21v-8m0 0c0-4-3-6-7-6 0 4 3 6 7 6zm0 0c0-3 2-5 6-5 0 3-2 5-6 5z",
  users: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 3-5 6-5s6 2 6 5M14 15c1-.6 1.800-.8 2-.8 3 0 6 2 6 5.800",
  truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  palette: "M12 3a9 9 0 1 0 0 18c1.500 0 2-1 1.500-2s0-2 1.500-2H17a4 4 0 0 0 4-4c0-5-4-10-9-10zM7.500 11h.01M10 7.500h.01M14.500 7.500h.01",
  home: "M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  dots: "M5 12h.01M12 12h.01M19 12h.01",
  share: "M12 3v12M8 7l4-4 4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6",
  back: "M15 18l-6-6 6-6",
  menu: "M4 7h16M4 12h16M4 17h16", close: "M6 6l12 12M18 6L6 18", chevron: "M6 9l6 6 6-6",
};
export default function Icon({ name, size = 20, className = "" }) {
  if (name === "whatsapp") return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 21l1.700-5A9 9 0 1 1 8 19.300L3 21z" fill="none" stroke="currentColor" strokeWidth="1.800" strokeLinejoin="round" />
      <path d="M9.200 8.200c-.4.400-.6 1.200-.2 2.200.900 2 2.600 3.500 4.600 4.200 1 .3 1.800 0 2.200-.6l.2-.7-1.800-.9-.8.800c-1.200-.5-2.200-1.500-2.700-2.700l.8-.8-.8-1.800z" fill="currentColor" />
    </svg>
  );
  if (name === "instagram") return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.500" cy="6.500" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
  if (name === "facebook") return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.700" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={name === "play" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name]} />
    </svg>
  );
}
