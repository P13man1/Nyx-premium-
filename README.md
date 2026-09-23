# Personal Portfolio

A fast, responsive single-page portfolio site — plain HTML, CSS, and JavaScript, no build step. Deploys to Vercel as static content.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Page content and structure |
| `styles.css` | Styling, light/dark themes, layout |
| `script.js` | Theme toggle, scroll animations, footer year |
| `vercel.json` | Static deployment config |

## Customize

Everything you need to edit lives in `index.html`:

- Replace **"Your Name"**, the tagline, and the About paragraphs.
- Update the three **Work** cards with your own projects and links.
- Set your email in the **Contact** section (`mailto:you@example.com`) and the GitHub / LinkedIn / X links.
- Colors and fonts live at the top of `styles.css` (the `:root` variables).

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Push to the connected branch and Vercel builds it automatically. No framework or build command needed — it's served as static files.
