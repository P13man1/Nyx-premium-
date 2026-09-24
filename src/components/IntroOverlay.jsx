import { useEffect, useRef, useState } from "react";
import { artist } from "../lib/content.js";
import { postJSON } from "../lib/hooks.js";

export default function IntroOverlay({ onEnter }) {
  const [playing, setPlaying] = useState(false); // true once "Entrer" pressed
  const [gone, setGone] = useState(false);
  const videoRef = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Muted teaser autoplay behind the title.
    const p = v.play?.();
    if (p && p.catch) p.catch(() => {});
    const onPlay = () => {
      if (!counted.current) {
        counted.current = true;
        postJSON("/api/stats", { type: "play" });
      }
    };
    const onEnded = () => leave();
    v.addEventListener("play", onPlay);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  // Press "Entrer": play the clip from the start, with sound.
  function enter() {
    const v = videoRef.current;
    if (v) {
      v.loop = false;
      v.muted = false;
      try {
        v.currentTime = 0;
      } catch {}
      const p = v.play?.();
      if (p && p.catch) p.catch(() => {});
    }
    setPlaying(true);
  }

  // Fade out and reveal the site.
  function leave() {
    setGone(true);
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
      } catch {}
    }
    setTimeout(onEnter, 700);
  }

  return (
    <div className={`intro${gone ? " hide" : ""}`} role="dialog" aria-label="Intro">
      <video
        ref={videoRef}
        src="/intro.mp4"
        poster="/intro-poster.jpg"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        className={playing ? "playing" : ""}
      />
      <div className="intro-veil" />

      {!playing && (
        <div className="intro-inner">
          <div className="display mark">
            FI<span>O</span>K
          </div>
          <div className="intro-sub">
            {artist.role} · {artist.country}
          </div>
          <button className="intro-enter" onClick={enter}>
            ▶ Entrer
          </button>
        </div>
      )}

      <button className="intro-skip" onClick={leave}>
        {playing ? "Entrer sur le site →" : "Passer l'intro →"}
      </button>
    </div>
  );
}
