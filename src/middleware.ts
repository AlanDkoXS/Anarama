import { defineMiddleware } from 'astro:middleware';
import { isValidLanguage } from '@/i18n/utils';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, redirect } = context;
  const pathname = url.pathname;

  // Skip middleware for static assets
  if (pathname.startsWith('/_astro/') || pathname.includes('.')) {
    return next();
  }

  // Handle root path - redirect to language-specific version
  if (pathname === '/') {
    // Let the index.astro handle the client-side detection
    return next();
  }

  // Extract language from URL
  const segments = pathname.split('/').filter(Boolean);
  const potentialLang = segments[0];

  // If no language in URL or invalid language, redirect to Spanish (default)
  if (!potentialLang || !isValidLanguage(potentialLang)) {
    const newPath = `/es${pathname}`;
    return redirect(newPath, 302);
  }

  // Valid language found, continue processing
  return next();
});