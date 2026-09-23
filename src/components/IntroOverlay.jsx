import { useEffect, useRef, useState } from "react";
import { artist } from "../lib/content.js";
import { postJSON } from "../lib/hooks.js";

export default function IntroOverlay({ onEnter }) {
  const [muted, setMuted] = useState(true);
  const [gone, setGone] = useState(false);
  const videoRef = useRef(null);
  const played = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const p = v.play?.();
    if (p && p.catch) p.catch(() => {}); // autoplay may be blocked; poster shows
    // Count a "play" once the video actually starts.
    const onPlay = () => {
      if (!played.current) {
        played.current = true;
        postJSON("/api/stats", { type: "play" });
      }
    };
    v.addEventListener("play", onPlay);
    return () => v.removeEventListener("play", onPlay);
  }, []);

  function enter() {
    setGone(true);
    const v = videoRef.current;
    if (v) {
      try { v.pause(); } catch {}
    }
    // Let the fade-out play, then unmount.
    setTimeout(onEnter, 700);
  }

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) {
      const p = v.play?.();
      if (p && p.catch) p.catch(() => {});
    }
  }

  return (
    <div className={`intro${gone ? " hide" : ""}`} role="dialog" aria-label="Intro">
      <video
        ref={videoRef}
        src="/intro.mp4"
        poster="/intro-poster.jpg"
        muted={muted}
        autoPlay
        loop
        playsInline
        preload="auto"
      />
      <div className="intro-veil" />
      <div className="intro-inner">
        <div className="display mark">
          FI<span>O</span>K
        </div>
        <div className="intro-sub">
          {artist.role} · {artist.country}
        </div>
        <button className="intro-enter" onClick={enter}>
          Entrer
        </button>
      </div>
      <button className="intro-sound" onClick={toggleSound} aria-label="Son">
        {muted ? "🔇" : "🔊"}
      </button>
      <button className="intro-skip" onClick={enter}>
        Passer l'intro →
      </button>
    </div>
  );
}
