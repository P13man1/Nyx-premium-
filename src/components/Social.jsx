import { socials, tiktokUsername, embeds } from "../lib/content.js";
import { useReveal } from "../lib/hooks.js";
import PlatformIcon from "./Icons.jsx";
import TikTokEmbed from "./TikTokEmbed.jsx";

export default function Social() {
  const ref = useReveal();
  const youtube = socials.find((s) => s.icon === "youtube");

  return (
    <section className="section" id="reseaux">
      <div className="wrap">
        <div className="section-head">
          <span className="num">03</span>
          <h2>Réseaux</h2>
        </div>

        <div className="social-grid reveal" ref={ref}>
          {socials.map((s) => (
            <a
              className={`social-card sc-${s.icon}`}
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sc-logo">
                <PlatformIcon name={s.icon} />
              </span>
              <div>
                <div className="plat">{s.platform}</div>
                <div className="handle">{s.handle}</div>
              </div>
              <div className="go">{s.cta} →</div>
            </a>
          ))}
        </div>

        <div className="feeds">
          <div className="feed-col">
            <div className="feed-label">
              <PlatformIcon name="tiktok" /> Profil TikTok en direct
            </div>
            <div className="tiktok-wrap">
              <TikTokEmbed username={tiktokUsername} videoId={embeds.tiktokVideoId} />
            </div>
          </div>

          <div className="feed-col">
            <div className="feed-label">
              <PlatformIcon name="youtube" /> YouTube
            </div>
            {embeds.youtubeVideoId ? (
              <div className="yt-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${embeds.youtubeVideoId}`}
                  title="Clip YouTube de FIOK"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <a className="yt-card" href={youtube?.url} target="_blank" rel="noopener noreferrer">
                <PlatformIcon name="youtube" />
                <span className="yt-handle">{youtube?.handle}</span>
                <span className="yt-go">Voir la chaîne →</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
