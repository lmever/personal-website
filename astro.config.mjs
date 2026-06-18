import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://example.com',
  integrations: [react()],
  adapter: cloudflare(),
});