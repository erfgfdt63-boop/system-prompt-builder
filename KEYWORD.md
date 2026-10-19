# Keyword pick (2026-10-19 Claude mode pass)

Google Trends Explore often returns HTTP 429 from this environment. Volume/KD below are from public SERP scans (2026-10) — not Keyword Planner exacts.

## Round-2 candidates (English market)

| # | Keyword | SERP feel | Soft-link to AI Bot Workflow Template Pack | Decision |
|---|---------|-----------|--------------------------------------------|----------|
| 1 | **system prompt builder** / **chatgpt system prompt generator** | Crowded: GetEasyPrompt, Stax.tools, FindSkill, 2prompt.app, Navid.me. Indie tools exist but head term is noisy for a fresh `*.vercel.app`. | Strong fit | **Demoted** from primary (keep as secondary / brand URL) |
| 2 | **chatgpt custom instructions generator** | Intent = paste into Settings → Custom Instructions. Competitors exist (AI Academy, RUMO, Junia, niche ADHD builders) but fewer mega-brand utility pages than “system prompt builder”. Matches ChatGPT-mode fields 1:1. | **Strong** — pack = roles, checklists, follow-ups after instructions are locked | **PRIMARY (default title / H1)** |
| 3 | **claude project instructions generator** / **claude project instructions builder** | Lower head competition; Claude Projects users search for “instructions” / “system prompt”. Now a **real UI mode** (purpose / behavior / knowledge / output). | Strong | **Secondary + on-page H2 / FAQ / feature** |
| 4 | **free system prompt generator no signup** | Long-tail privacy intent; reinforces browser-only story. | Medium | **Secondary** |
| 5 | **utm builder** / **cron expression generator** | High volume utilities | Weak pack fit | Still rejected |

## Locked primary (2026-10-19)

- **Primary (default):** ChatGPT custom instructions generator  
- **Title (42 chars):** `Free ChatGPT Custom Instructions Generator`  
- **H1:** `Free ChatGPT Custom Instructions Generator` (ChatGPT stays primary; Claude called out in lede + tabs)  
- **Meta (~155 chars):** Free ChatGPT custom instructions generator — plus a Claude Project instructions mode. Paste-ready prompts, no signup, runs in your browser.  
- **Secondaries:** Claude project instructions generator; Claude project instructions builder; free system prompt generator no signup  
- **URL kept:** `system-prompt-builder.vercel.app` (no new domain; no new product)

## Product surface (this pass)

- Tab A (default): ChatGPT Custom Instructions — role / audience / tone / tasks / rules / format  
- Tab B: Claude Project Instructions — project purpose / how Claude should behave / knowledge notes / output preferences  
- Deep-link: `?mode=claude` opens Claude tab  
- Soft CTA unchanged (Shopify pack, no price in copy)

## On-page SEO

- Title ≤60 chars; H1 aligned to primary; Claude in lede / tabs / H2 / FAQ (not stuffed into title)  
- Form H2 swaps with mode  
- Output H2 swaps with mode  
- Entity facts (what / who / how) mention both modes  
- Canonical, og:locale, author meta kept  
- Soft CTA unchanged

## GEO checklist (kept + extended)

- [x] Clear entity in first screen (what / who for / how it works) — crawlable HTML  
- [x] FAQPage JSON-LD mirroring visible FAQ (incl. Claude Project mode how-to)  
- [x] WebApplication JSON-LD (price 0; alternateName + featureList for Claude mode; no fake ratings)  
- [x] Organization + WebSite JSON-LD (`Omnigoods`)  
- [x] HowTo JSON-LD includes “pick a mode” step  
- [x] Steps crawlable in HTML `<ol>` (not JS-only)  
- [x] Main content server-rendered in `index.html`  
- [x] Unique answer-style FAQ for real queries  
- [x] Semantic H1/H2; no decorative images (N/A alt)  
- [x] Canonical URL set  
- [x] `robots.txt` allows GPTBot / PerplexityBot / ClaudeBot / Google-Extended  
- [x] `llms.txt` mentions both modes  
- [x] Sitemap lastmod refreshed  

## Honest note

A Vercel subdomain still ranks slowly without backlinks / Search Console. JSON-LD + FAQ improve citation *readiness* for ChatGPT / Perplexity; they do not guarantee traffic or citations. Monetization remains soft CTA → Shopify pack (HK$147). No fake `aggregateRating`. No new domain / Stripe / repo.
