import { useEffect } from "react";

// Renders FIOK's real TikTok profile (recent videos) via TikTok's
// official creator embed. Only the username is needed.
export default function TikTokEmbed({ username }) {
  useEffect(() => {
    const SRC = "https://www.tiktok.com/embed.js";
    // Remove any previous instance so the widget re-scans the DOM.
    document.querySelectorAll(`script[src="${SRC}"]`).forEach((s) => s.remove());
    const s = document.createElement("script");
    s.async = true;
    s.src = SRC;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, [username]);

  return (
    <blockquote
      className="tiktok-embed"
      cite={`https://www.tiktok.com/@${username}`}
      data-unique-id={username}
      data-embed-type="creator"
      style={{ maxWidth: "100%", minWidth: 288, margin: 0 }}
    >
      <section>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.tiktok.com/@${username}`}
        >
          @{username}
        </a>
      </section>
    </blockquote>
  );
}
