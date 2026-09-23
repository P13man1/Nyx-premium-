import { socials } from "../lib/content.js";
import { useReveal } from "../lib/hooks.js";

export default function Social() {
  const ref = useReveal();
  return (
    <section className="section" id="reseaux">
      <div className="wrap">
        <div className="section-head">
          <span className="num">04</span>
          <h2>Réseaux</h2>
        </div>
        <div className="social-grid reveal" ref={ref}>
          {socials.map((s) => (
            <a
              className="social-card"
              key={s.platform}
              href={s.url}
              target={s.url !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <div>
                <div className="plat">{s.platform}</div>
                <div className="handle">{s.handle}</div>
              </div>
              <div className="go">{s.cta} →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
