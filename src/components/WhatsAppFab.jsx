import { waLink } from "../utils.js";
import Icon from "./Icon.jsx";

export default function WhatsAppFab() {
  return (
    <a className="fab" href={waLink("Hi Him Craft Studio! I'd like to know more about your products.")} target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp">
      <span className="fab-label">Enquire on WhatsApp</span>
      <span className="fab-icon"><Icon name="whatsapp" size={28} /></span>
    </a>
  );
}
