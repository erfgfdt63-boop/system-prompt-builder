# Keyword pick (2026-10-19 GEO pass)

Google Trends Explore often returns HTTP 429 from this environment. Volume/KD below are from public SERP scans (2026-10) — not Keyword Planner exacts.

## Round-2 candidates (English market)

| # | Keyword | SERP feel | Soft-link to AI Bot Workflow Template Pack | Decision |
|---|---------|-----------|--------------------------------------------|----------|
| 1 | **system prompt builder** / **chatgpt system prompt generator** | Crowded: GetEasyPrompt, Stax.tools, FindSkill, 2prompt.app, Navid.me. Indie tools exist but head term is noisy for a fresh `*.vercel.app`. | Strong fit | **Demoted** from primary (keep as secondary / brand URL) |
| 2 | **chatgpt custom instructions generator** | Intent = paste into Settings → Custom Instructions. Competitors exist (AI Academy, RUMO, Junia, niche ADHD builders) but fewer mega-brand utility pages than “system prompt builder”. Matches our form fields 1:1. | **Strong** — pack = roles, checklists, follow-ups after instructions are locked | **PRIMARY** |
| 3 | **claude project instructions builder** | Lower head competition; Claude Projects users search for “instructions” / “system prompt”. | Strong | **Secondary** |
| 4 | **free system prompt generator no signup** | Long-tail privacy intent; reinforces browser-only story. | Medium | **Secondary** |
| 5 | **utm builder** / **cron expression generator** | High volume utilities | Weak pack fit | Still rejected |

## Locked primary (2026-10-19)

- **Primary:** ChatGPT custom instructions generator  
- **Title (42 chars):** `Free ChatGPT Custom Instructions Generator`  
- **H1:** `Free ChatGPT Custom Instructions Generator`  
- **Meta (~144 chars):** Free ChatGPT custom instructions generator. Build paste-ready prompts for ChatGPT, Claude Projects, or Gemini — no signup, runs in your browser.  
- **Secondaries:** Claude project instructions builder; free system prompt generator no signup  
- **URL kept:** `system-prompt-builder.vercel.app` (no new domain; no new product)

## On-page SEO (this GEO round)

- Title ≤60 chars; meta ~144; H1/H2 aligned to primary + secondaries  
- Form H2 → `Build your ChatGPT custom instructions`  
- Output H2 → `Your paste-ready system prompt`  
- Entity facts (what / who / how) in first screen HTML  
- Canonical, og:locale, author meta kept/added  
- Soft CTA unchanged (Shopify pack, no price in copy)

## GEO checklist (done 2026-10-19 HKT)

- [x] Clear entity in first screen (what / who for / how it works) — crawlable HTML  
- [x] FAQPage JSON-LD mirroring visible FAQ (incl. custom instructions vs system prompt; no signup; Claude builder)  
- [x] WebApplication JSON-LD (price 0; no fake ratings)  
- [x] Organization + WebSite JSON-LD (`Omnigoods`)  
- [x] HowTo JSON-LD matching visible 3-step list  
- [x] Steps crawlable in HTML `<ol>` (not JS-only)  
- [x] Main content server-rendered in `index.html`  
- [x] Unique answer-style FAQ for real queries  
- [x] Semantic H1/H2; no decorative images (N/A alt)  
- [x] Canonical URL set  
- [x] `robots.txt` allows GPTBot / PerplexityBot / ClaudeBot / Google-Extended  
- [x] `llms.txt` added for agent discovery  
- [x] Sitemap lastmod refreshed  

## Honest note

A Vercel subdomain still ranks slowly without backlinks / Search Console. JSON-LD + FAQ improve citation *readiness* for ChatGPT / Perplexity; they do not guarantee traffic or citations. Monetization remains soft CTA → Shopify pack (HK$147). No fake `aggregateRating`.
