import { tracks, embeds, socials } from "../lib/content.js";
import { useReveal } from "../lib/hooks.js";

export default function Music() {
  const ref = useReveal();
  const streaming = socials.filter((s) =>
    ["Spotify", "Apple Music", "Audiomack", "YouTube"].includes(s.platform)
  );

  return (
    <section className="section" id="musique">
      <div className="wrap">
        <div className="section-head">
          <span className="num">01</span>
          <h2>Musique</h2>
        </div>

        <div className="music-grid reveal" ref={ref}>
          {tracks.map((t, i) => (
            <a
              className="track"
              key={i}
              href={t.url}
              target={t.url !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <span className="track-num display">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="track-info">
                <h3>{t.title}</h3>
                <p>{t.meta}</p>
              </div>
              <span className="track-play">▶</span>
            </a>
          ))}
        </div>

        {(embeds.youtubeVideoId || embeds.spotifyUri) && (
          <div className="embeds">
            {embeds.youtubeVideoId && (
              <iframe
                height="220"
                src={`https://www.youtube.com/embed/${embeds.youtubeVideoId}`}
                title="Clip YouTube de FIOK"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            {embeds.spotifyUri && (
              <iframe
                height="220"
                src={`https://open.spotify.com/embed/${embeds.spotifyUri}`}
                title="Lecteur Spotify de FIOK"
                loading="lazy"
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            )}
          </div>
        )}

        <div className="stream-links">
          {streaming.map((s) => (
            <a
              key={s.platform}
              className="btn btn-ghost"
              href={s.url}
              target={s.url !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {s.platform}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
