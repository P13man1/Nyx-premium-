// ═══════════════════════════════════════════════════════════════
//  CONTENU DU SITE — modifie tout ici (textes, liens, réseaux).
//  Everything editable in one place. Replace the placeholders below.
// ═══════════════════════════════════════════════════════════════

export const artist = {
  name: "FIOK",
  role: "Artiste · Chanteur",
  country: "Togo",
  // Petite accroche affichée sous le nom
  tagline:
    "Une voix venue du Togo. Entre afro, drill et mélodies de rue — FIOK raconte le bitume, le cœur et l'ambition.",
};

// Étiquettes courtes sous le nom (genres / styles)
export const tags = ["Afrobeat", "Drill", "Rap", "Togo 🇹🇬", "Street"];

// Bandeau défilant
export const marquee = [
  "Nouveau son",
  "FIOK",
  "En écoute partout",
  "Togo",
  "Abonne-toi",
];

// Section « À propos » — remplace par la vraie bio
export const about = {
  lead: "FIOK, c'est le son d'une nouvelle génération togolaise.",
  paragraphs: [
    "Écris ici la vraie biographie de FIOK : d'où il vient, comment il a commencé la musique, ce qui l'inspire et ce qu'il veut transmettre à travers ses morceaux.",
    "Ajoute un deuxième paragraphe : ses influences, ses projets, ses collaborations, la scène qu'il représente. Le but est que ses fans découvrent l'homme derrière la voix.",
  ],
  // Petit mot manuscrit sur la photo
  note: "100% Togo",
  stats: [
    { value: "2024", label: "Depuis" },
    { value: "10+", label: "Titres" },
    { value: "228", label: "Indicatif TG" },
  ],
};

// Morceaux à mettre en avant (titre + info). Ajoute/retire librement.
export const tracks = [
  { title: "Titre du morceau #1", meta: "Single · 2025", url: "#" },
  { title: "Titre du morceau #2", meta: "Single · 2025", url: "#" },
  { title: "Titre du morceau #3", meta: "EP · 2024", url: "#" },
  { title: "Titre du morceau #4", meta: "Freestyle · 2024", url: "#" },
];

// Lecteurs intégrés (colle l'ID de la vidéo YouTube et l'URI Spotify).
// Laisse null pour masquer un lecteur.
export const embeds = {
  // Ex : "dQw4w9WgXcQ"  (l'identifiant après watch?v=)
  youtubeVideoId: null,
  // Ex : "track/xxxxxxxx" ou "artist/xxxxxxxx" ou "album/xxxxxxxx"
  spotifyUri: null,
};

// Réseaux & plateformes — mets les vrais liens.
export const socials = [
  { platform: "YouTube", handle: "@FIOK", url: "#", cta: "Regarder" },
  { platform: "Spotify", handle: "FIOK", url: "#", cta: "Écouter" },
  { platform: "Instagram", handle: "@fiok", url: "#", cta: "Suivre" },
  { platform: "TikTok", handle: "@fiok", url: "#", cta: "Suivre" },
  { platform: "Apple Music", handle: "FIOK", url: "#", cta: "Écouter" },
  { platform: "Audiomack", handle: "FIOK", url: "#", cta: "Écouter" },
];

// Galerie — images dans /public. Ajoute les tiennes.
export const gallery = [
  { src: "/fiok-portrait.jpg", caption: "FIOK" },
  { src: "/art-hands.jpg", caption: "Voir · Dire · Entendre" },
  { src: "/art-violin.jpg", caption: "La mélodie" },
];

// Contact direct (booking / presse)
export const contact = {
  email: "contact@fiok.com", // ← mets le vrai mail de booking
  bookingNote:
    "Booking, featurings, presse ou collaborations — écris directement ici.",
};
