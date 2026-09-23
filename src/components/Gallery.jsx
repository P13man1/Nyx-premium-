import { gallery } from "../lib/content.js";
import { useReveal } from "../lib/hooks.js";

export default function Gallery() {
  const ref = useReveal();
  return (
    <section className="section" id="galerie">
      <div className="wrap">
        <div className="section-head">
          <span className="num">03</span>
          <h2>Galerie</h2>
        </div>
        <div className="gallery reveal" ref={ref}>
          {gallery.map((g, i) => (
            <figure key={i}>
              <img src={g.src} alt={g.caption} loading="lazy" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
