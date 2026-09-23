# FIOK — Site officiel

Site vitrine de **FIOK**, artiste togolais. React + Vite, déployé sur Vercel,
avec une base de données **Neon (Postgres)** pour la newsletter, les messages
de contact et le compteur de visites/lectures.

## ✏️ Modifier le contenu

Presque tout est centralisé dans **`src/lib/content.js`** :

- Nom, rôle, accroche, tags
- Bio (« À propos »)
- Liste des morceaux
- Lecteurs YouTube / Spotify (`embeds`)
- Liens des réseaux sociaux (`socials`)
- Galerie d'images
- Email de contact / booking

Les images sont dans **`public/`** :
`fiok-portrait.jpg`, `art-hands.jpg`, `art-violin.jpg`,
plus la vidéo d'intro `intro.mp4` et son image `intro-poster.jpg`.

## 🧩 Structure

| Dossier / fichier | Rôle |
|---|---|
| `src/components/` | Sections React (Hero, About, Music, Gallery, Social, Connect, Footer, IntroOverlay) |
| `src/lib/content.js` | **Tout le contenu éditable** |
| `src/lib/hooks.js` | Animations au scroll + appels API |
| `api/` | Fonctions serverless Vercel (Neon) |
| `public/` | Images et vidéo |

## 🗄️ Base de données (Neon)

Le site marche sans base (les formulaires affichent juste un message).
Pour activer la newsletter / le contact / les compteurs, il faut une variable
d'environnement `DATABASE_URL` (fournie par Neon).

Sur Vercel : **Storage → Marketplace → Neon → Connect**. La variable
`DATABASE_URL` est injectée automatiquement. Les tables
(`subscribers`, `messages`, `counters`) sont créées toutes seules au premier appel.

### Endpoints API

- `POST /api/subscribe` — `{ email }` → inscription newsletter
- `POST /api/contact` — `{ name, email, message }` → message de booking
- `GET  /api/stats` — renvoie `{ visits, plays }`
- `POST /api/stats` — `{ type: "visit" | "play" }` → incrémente

## 💻 En local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production dans dist/
```

Les fonctions `api/` ne tournent qu'une fois déployées sur Vercel
(ou via `vercel dev`).
