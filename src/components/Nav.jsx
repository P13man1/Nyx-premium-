export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          FI<span>O</span>K
        </a>
        <div className="nav-menu">
          <a href="#about">À propos</a>
          <a href="#musique">Musique</a>
          <a href="#galerie">Galerie</a>
          <a href="#reseaux">Réseaux</a>
          <a href="#contact" className="nav-cta">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
