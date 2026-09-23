import { about } from "../lib/content.js";
import { useReveal } from "../lib/hooks.js";

export default function About() {
  const ref = useReveal();
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="section-head">
          <span className="num">01</span>
          <h2>À propos</h2>
        </div>
        <div className="about-grid reveal" ref={ref}>
          <div className="about-body">
            <p className="lead">{about.lead}</p>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="stats">
              {about.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-photo">
            <img src="/art-hands.jpg" alt="Illustration artistique" />
            <span className="script about-note">{about.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
