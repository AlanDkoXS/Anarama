// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Configure i18n routing
  i18n: {
    defaultLocale: 'es', // Spanish as default for Mexican company
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true, // Always show /es/ and /en/ prefixes
    },
  },
  
  // View transitions are enabled by default in Astro 5.x
  
  // Build configuration
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Development server configuration
  server: {
    port: 4321,
    host: true,
  },
});
