# System Prompt Builder (Omnigoods free tool)

A single-page English utility: fill role / audience / tone / tasks / rules / output format → get a copy-ready **system prompt** for ChatGPT, Claude, Gemini, or custom GPTs.

- Pure HTML + CSS + JS (no build step, no npm required)
- Runs entirely in the browser — no tracking scripts, nothing uploaded
- Soft footer link to the paid [AI Bot Workflow Template Pack](https://v8gt0i-12.myshopify.com/products/ai-bot-workflow-template-pack)

**Local path:** `/workspace/deliverables/ai-tool-site/`

## Keyword (locked 2026-10-19)

Primary: **chatgpt custom instructions generator**  
Secondaries: **claude project instructions builder**, **free system prompt generator no signup**  
(Former primary “system prompt builder” demoted — SERP crowded.)  
See `KEYWORD.md` for the round-2 comparison.

## Run locally

```bash
cd /workspace/deliverables/ai-tool-site
# Option A — open the file
open index.html   # macOS
xdg-open index.html  # Linux

# Option B — tiny static server (any of these)
python3 -m http.server 4173
# then visit http://127.0.0.1:4173/
```

No `npm install` needed. There is no `package.json` on purpose.

## Deploy to Vercel for $0 (no custom domain)

1. Create a free GitHub repo (public or private).
2. Push this folder as the repo root:

```bash
cd /workspace/deliverables/ai-tool-site
git init
git add .
git commit -m "Initial system prompt builder"
# create empty repo on GitHub, then:
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

3. Go to [vercel.com](https://vercel.com) → Add New Project → Import that GitHub repo.
4. Framework Preset: **Other** (static). Root directory: `.`  
   Build command: leave empty. Output directory: leave empty / `.`
5. Deploy. You get a free `*.vercel.app` URL.
6. After deploy, replace every `REPLACE_WITH_VERCEL_URL` in:
   - `index.html` (`<link rel="canonical">`)
   - `robots.txt`
   - `sitemap.xml`  
   Commit and push again (Vercel auto-redeploys).

Do **not** buy a domain for this drill.

## Google Search Console later

1. Search Console → Add property → URL prefix → paste your `https://….vercel.app`
2. Choose **HTML tag** verification (or DNS if you later add a domain).
3. For HTML tag: Vercel → Project → Settings → or add the meta tag Google gives you into `index.html` `<head>`, e.g.:

```html
<meta name="google-site-verification" content="PASTE_TOKEN_HERE" />
```

4. Submit `https://YOUR_URL/sitemap.xml` under Sitemaps.

## Monetize path (honest)

This CloudHu-style drill **alone rarely makes money**. Ranking a fresh Vercel subdomain for a competitive utility query can take weeks/months, or never, without links.

Options (only #1 is implemented):

1. **Free tool + soft CTA** to the digital pack (footer link) — preferred, live now.
2. Later: Stripe tip jar / paywall for extra presets — **not** built; do not add until there is real traffic.

Do not expect Omnigoods revenue from this before the Shopify store window closes (Nov 4, 2026). Treat it as a free experiment + pack discovery path.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page + SEO meta |
| `styles.css` | Layout |
| `app.js` | Builder logic + presets |
| `robots.txt` | Allow crawl + sitemap pointer |
| `sitemap.xml` | Single URL sitemap |
| `vercel.json` | Static headers |
| `KEYWORD.md` | Keyword research notes |
| `README.md` | This file |
