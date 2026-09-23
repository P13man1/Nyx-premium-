import { useCounters } from "../lib/hooks.js";
import { contact } from "../lib/content.js";

export default function Footer() {
  const counters = useCounters();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <a href="#top" className="big display">
          FIOK
        </a>
        <div className="footer-meta">
          <span>© {year} FIOK · Togo 🇹🇬</span>
          <span>
            {counters ? (
              <>
                {counters.visits?.toLocaleString("fr-FR")} visites ·{" "}
                {counters.plays?.toLocaleString("fr-FR")} lectures
              </>
            ) : (
              " "
            )}
          </span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
    </footer>
  );
}
