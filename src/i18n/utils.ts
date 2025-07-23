import { ui, defaultLang, languages } from './ui';
import { routes, type Language, type RouteKey } from './routes';

export type UiKey = keyof typeof ui[typeof defaultLang];
export type { RouteKey, Language };

export function getLangFromUrl(url: URL): keyof typeof ui {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: UiKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

// Get the path without language prefix
export function getPathWithoutLang(url: URL): string {
  const [, lang, ...pathParts] = url.pathname.split('/');
  if (lang && lang in ui) {
    return '/' + pathParts.join('/');
  }
  return url.pathname;
}

// Get all available languages
export function getLanguages(): Array<{ code: Language; name: string }> {
  return Object.entries(languages).map(([code, name]) => ({
    code: code as Language,
    name,
  }));
}

// Check if a language is supported
export function isValidLanguage(lang: string): lang is Language {
  return lang in ui;
}

// Get the opposite language (for language toggle)
export function getAlternateLanguage(currentLang: Language): Language {
  return currentLang === 'en' ? 'es' : 'en';
}

// Get localized route path
export function getLocalizedPath(lang: Language, routeKey: RouteKey): string {
  return `/${lang}${routes[lang][routeKey]}`;
}

// Get route key from current path
export function getCurrentRouteKey(url: URL): RouteKey | null {
  const lang = getLangFromUrl(url) as Language;
  const pathWithoutLang = getPathWithoutLang(url);
  
  const langRoutes = routes[lang];
  for (const [key, route] of Object.entries(langRoutes)) {
    if (route === pathWithoutLang || (pathWithoutLang === '/' && route === '/')) {
      return key as RouteKey;
    }
  }
  return null;
}

// Get alternate language URL for current page
export function getAlternateLanguageUrl(url: URL): string {
  const currentLang = getLangFromUrl(url) as Language;
  const alternateLang = getAlternateLanguage(currentLang);
  const routeKey = getCurrentRouteKey(url);
  
  if (!routeKey) {
    return `/${alternateLang}/`;
  }
  
  return getLocalizedPath(alternateLang, routeKey);
}
