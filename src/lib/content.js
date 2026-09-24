// ═══════════════════════════════════════════════════════════════
//  CONTENU DU SITE — modifie tout ici (textes, liens, réseaux).
// ═══════════════════════════════════════════════════════════════

export const artist = {
  name: "FIOK",
  role: "Artiste · Chanteur",
  country: "Togo",
  tagline:
    "Une voix venue du Togo. Afro, drill et mélodies de rue — le bitume, le cœur, l'ambition.",
};

export const tags = ["Afrobeat", "Drill", "Rap", "Togo 🇹🇬", "Street"];

export const marquee = ["Nouveau son", "FIOK", "En écoute partout", "Togo", "Abonne-toi"];

// Morceaux mis en avant
export const tracks = [
  { title: "Titre du morceau #1", meta: "Single · 2025", url: "#" },
  { title: "Titre du morceau #2", meta: "Single · 2025", url: "#" },
  { title: "Titre du morceau #3", meta: "EP · 2024", url: "#" },
  { title: "Titre du morceau #4", meta: "Freestyle · 2024", url: "#" },
];

// Lecteurs intégrés.
export const embeds = {
  youtubeVideoId: null, // ex: "dQw4w9WgXcQ"
  spotifyUri: null, // ex: "track/xxxxxxxx"
  // Colle l'ID d'UNE vidéo TikTok pour un lecteur garanti (le chiffre
  // à la fin du lien: tiktok.com/@fiok_228/video/1234567890 → "1234567890").
  tiktokVideoId: null,
};

// Nom d'utilisateur TikTok (sans @) — sert à afficher le vrai profil.
export const tiktokUsername = "fiok_228";

// Réseaux & plateformes.
// Les plateformes marquées `soon: true` s'affichent en « Bientôt ».
// Pour les activer : ajoute `url` + `handle` et enlève `soon`.
export const socials = [
  {
    platform: "TikTok",
    handle: "@fiok_228",
    url: "https://www.tiktok.com/@fiok_228",
    icon: "tiktok",
    cta: "Suivre",
  },
  {
    platform: "YouTube",
    handle: "@FIOK-001",
    url: "https://www.youtube.com/@FIOK-001",
    icon: "youtube",
    cta: "S'abonner",
  },
  { platform: "Spotify", icon: "spotify", soon: true },
  { platform: "Instagram", icon: "instagram", soon: true },
  { platform: "Apple Music", icon: "applemusic", soon: true },
  { platform: "X (Twitter)", icon: "x", soon: true },
];

// Galerie
export const gallery = [
  { src: "/fiok-portrait.jpg", caption: "FIOK" },
  { src: "/art-hands.jpg", caption: "Voir · Dire · Entendre" },
  { src: "/art-violin.jpg", caption: "La mélodie" },
];

// Contact / booking
export const contact = {
  email: "contact@fiok.com",
  bookingNote: "Booking, featurings, presse ou collaborations — écris ici.",
};
