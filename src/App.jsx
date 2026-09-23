import { useEffect, useState } from "react";
import IntroOverlay from "./components/IntroOverlay.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Music from "./components/Music.jsx";
import Gallery from "./components/Gallery.jsx";
import Social from "./components/Social.jsx";
import Connect from "./components/Connect.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // Show the intro once per browser session.
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem("fiok_intro") !== "seen";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
  }, [showIntro]);

  function dismissIntro() {
    try {
      sessionStorage.setItem("fiok_intro", "seen");
    } catch {}
    setShowIntro(false);
  }

  return (
    <>
      {showIntro && <IntroOverlay onEnter={dismissIntro} />}
      <Nav />
      <main>
        <Hero />
        <About />
        <Music />
        <Gallery />
        <Social />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
