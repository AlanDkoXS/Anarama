/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Theme types
export type ThemeMode = 'light' | 'dark' | 'auto';
export type EffectiveTheme = 'light' | 'dark';

// Language types
export type SupportedLanguage = 'en' | 'es';

// Theme Manager interface
export interface ThemeManager {
  setTheme: (_theme: ThemeMode) => void;
  getTheme: () => ThemeMode;
  getEffectiveThemePublic: () => EffectiveTheme;
}

// Global type definitions for the project
declare global {
  interface Window {
    themeManager?: ThemeManager;
  }
}

// JSX type definitions for Astro
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: Record<string, unknown>;
    }
  }
}