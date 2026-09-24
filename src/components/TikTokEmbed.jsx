import { useEffect } from "react";
import { TikTokIcon } from "./Icons.jsx";

// Shows FIOK's real TikTok content.
// - If a videoId is provided, embeds that video (always reliable).
// - Otherwise tries TikTok's official creator feed, with a clean
//   themed card as fallback so it never looks broken.
export default function TikTokEmbed({ username, videoId }) {
  useEffect(() => {
    if (videoId) return; // iframe path needs no script
    const SRC = "https://www.tiktok.com/embed.js";
    document.querySelectorAll(`script[src="${SRC}"]`).forEach((s) => s.remove());
    const s = document.createElement("script");
    s.async = true;
    s.src = SRC;
    document.body.appendChild(s);
  }, [username, videoId]);

  if (videoId) {
    return (
      <div className="tt-video">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          title={`TikTok de @${username}`}
          allow="encrypted-media; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  const profile = `https://www.tiktok.com/@${username}`;
  return (
    <blockquote
      className="tiktok-embed"
      cite={profile}
      data-unique-id={username}
      data-embed-type="creator"
      style={{ maxWidth: "100%", minWidth: 288, margin: 0 }}
    >
      <section className="tt-fallback">
        <TikTokIcon />
        <span className="tt-handle">@{username}</span>
        <a
          className="btn btn-red"
          target="_blank"
          rel="noopener noreferrer"
          href={`${profile}?refer=creator_embed`}
        >
          Voir le profil TikTok
        </a>
      </section>
    </blockquote>
  );
}
