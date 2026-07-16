# Aryan Sharma — Portfolio

A minimalist, statically-generated personal site with a blog, built with
[Astro](https://astro.build). Ships as plain semantic HTML so it's fast for
humans and easy for search engines and AI agents to crawl.

## Commands

```bash
npm install       # install dependencies (once)
npm run dev       # local dev server at http://localhost:4321
npm run build     # build static site into dist/
npm run preview   # preview the production build locally
```

## How to write a blog post

Create a Markdown file in `src/content/blog/`, e.g. `src/content/blog/my-post.md`:

```markdown
---
title: "My post title"
description: "One line for previews and search results."
pubDate: 2026-07-20
tags: ["kafka", "performance"]   # optional
draft: false                      # set true to hide it
---

Write your post here in Markdown.
```

It automatically appears on `/blog`, in the RSS feed, in the sitemap, and in
`llms.txt`. The filename becomes the URL (`/blog/my-post`).

## How to update your info

All personal data (bio, skills, experience, projects, education) lives in one
file: [`src/data/site.ts`](src/data/site.ts). Edit it and everything — the home
page, the JSON-LD structured data, and `llms.txt` — updates in sync.

To replace the résumé, drop a new PDF at `public/resume.pdf`.

## Before you deploy

Set your real domain in **two** places:

1. `astro.config.mjs` → `SITE_URL`
2. `public/robots.txt` → the `Sitemap:` line

Also update your real profile links (`github`, `leetcode`, `linkedin`) in
`src/data/site.ts`.

## AI-crawler / SEO features

- **Static HTML** — no JavaScript needed to read the content.
- **Semantic markup** — proper headings, `<article>`, `<time>`, landmarks.
- **JSON-LD structured data** — `Person`, `Blog`, and `BlogPosting` schemas.
- **`/llms.txt`** — plain-text summary of the whole site for LLMs
  ([llmstxt.org](https://llmstxt.org)), generated dynamically from your data.
- **`/robots.txt`** — explicitly allows major AI crawlers (GPTBot, ClaudeBot,
  PerplexityBot, etc.).
- **`/sitemap-index.xml`** and **`/rss.xml`** — auto-generated.
- **Open Graph + Twitter cards** and canonical URLs on every page.

## Deploying

The site is fully static (`dist/`), so any static host works — Cloudflare
Pages, Netlify, Vercel, or GitHub Pages. Point the host at this repo with build
command `npm run build` and output directory `dist`.
