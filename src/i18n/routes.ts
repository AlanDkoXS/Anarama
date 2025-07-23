export const routes = {
  en: {
    home: '/',
    about: '/about',
    services: '/services',
    gallery: '/gallery',
    contact: '/contact',
  },
  es: {
    home: '/',
    about: '/acerca',
    services: '/servicios',
    gallery: '/galeria',
    contact: '/contacto',
  },
} as const;

export type RouteKey = keyof typeof routes.en;
export type Language = keyof typeof routes;

// Helper function to get translated route
export function getRoute(lang: Language, routeKey: RouteKey): string {
  return routes[lang][routeKey];
}

// Helper function to get route key from path
export function getRouteKey(path: string, lang: Language): RouteKey | null {
  const langRoutes = routes[lang];
  for (const [key, route] of Object.entries(langRoutes)) {
    if (route === path) {
      return key as RouteKey;
    }
  }
  return null;
}

// Helper function to get alternate language URL
export function getAlternateUrl(currentPath: string, currentLang: Language, targetLang: Language): string {
  const routeKey = getRouteKey(currentPath, currentLang);
  if (!routeKey) return '/';
  
  return `/${targetLang}${getRoute(targetLang, routeKey)}`;
}