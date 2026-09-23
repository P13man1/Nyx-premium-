import { artist, tags, marquee } from "../lib/content.js";
import { useReveal } from "../lib/hooks.js";

export default function Hero() {
  const ref = useReveal();
  const loop = [...marquee, ...marquee];
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid reveal" ref={ref}>
          <div>
            <p className="kicker">Site officiel · {artist.country}</p>
            <h1 className="hero-name display">
              <span className="red">FI</span>
              <span className="out">O</span>K
            </h1>
            <div className="hero-tags">
              {tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p className="hero-lead">{artist.tagline}</p>
            <div className="hero-actions">
              <a href="#musique" className="btn btn-red">
                ▶ Écouter
              </a>
              <a href="#reseaux" className="btn btn-ghost">
                Réseaux
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <span className="hero-badge display">Nouveau</span>
            <img src="/fiok-portrait.jpg" alt="FIOK, artiste togolais" />
          </div>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {loop.map((m, i) => (
            <span key={i} className={i % 2 ? "dim" : ""}>
              {m} ✦
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
