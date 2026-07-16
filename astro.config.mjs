// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

// Update this to your real domain before deploying — it powers the
// sitemap, RSS feed, and canonical/OpenGraph URLs.
export const SITE_URL = 'https://aryansharma.dev';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],

  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },

  adapter: cloudflare()
});