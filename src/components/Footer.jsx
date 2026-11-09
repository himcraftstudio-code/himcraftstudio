import { Link, goSection } from "../router.jsx";
import { footer, contact, site } from "../data/siteData.js";
import { waLink } from "../utils.js";
import { Logo } from "./Header.jsx";
import Icon from "./Icon.jsx";

function FLink({ l }) {
  if (l.to) return <Link to={l.to}>{l.label}</Link>;
  return <button onClick={() => goSection(l.section)}>{l.label}</button>;
}

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container foot-grid">
        <div><Logo /><p className="muted foot-note">{footer.blurb}</p></div>
        {footer.columns.map((c) => <div key={c.title}><h4>{c.title}</h4>{c.links.map((l) => <FLink key={l.label} l={l} />)}</div>)}
        <div>
          <h4>Reach us</h4>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>Call / WhatsApp<br /><b className="ph">{contact.phone}</b></a>
          <a className="foot-wa" href={waLink("Hi Him Craft Studio! I'd like to know more.")} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} /> Chat on WhatsApp</a>
        </div>
      </div>
      <div className="foot-word" aria-hidden="true">{site.name}</div>
      <div className="container legal"><span>© 2026 {site.name}. All pieces handmade to order.</span><span>Made with yarn, needles &amp; patience.</span></div>
    </footer>
  );
}
