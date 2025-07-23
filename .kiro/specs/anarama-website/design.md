# Design Document

## Overview

The Compañía de Títeres Anarama website will be built as a modern, accessible, and multilingual web application using Astro. The design emphasizes mobile-first responsive design, smooth user experience through view transitions, and automatic adaptation to user preferences for language and theme. The site will showcase the puppet theater company's educational mission and services while maintaining professional aesthetics suitable for both individual clients and institutional partners.

## Architecture

### Technology Stack
- **Framework**: Astro 5.11.1 (Static Site Generation with Islands Architecture)
- **Styling**: CSS with CSS Custom Properties for theming
- **Internationalization**: Built-in Astro i18n with existing structure (`/en/` and `/es/` routes)
- **View Transitions**: Astro's built-in View Transitions API
- **Theme Management**: CSS Custom Properties with JavaScript for dynamic switching
- **Build Tool**: Vite (included with Astro)

### Project Structure
```
src/
├── components/
│   ├── common/           # Shared components
│   ├── navigation/       # Navigation components
│   └── sections/         # Page section components
├── layouts/
│   └── Layout.astro      # Main layout with theme/i18n support
├── pages/
│   ├── en/              # English pages
│   └── es/              # Spanish pages
├── i18n/
│   ├── ui.ts            # Translation keys (existing)
│   └── utils.ts         # i18n utilities (existing)
├── styles/
│   ├── global.css       # Global styles and CSS custom properties
│   └── components/      # Component-specific styles
└── assets/
    └── images/          # Image assets
```

### Routing Strategy
- **Base Routes**: `/` (redirects to detected language)
- **English Routes**: `/en/`, `/en/about/`, `/en/services/`, `/en/contact/`, `/en/gallery/`
- **Spanish Routes**: `/es/`, `/es/acerca/`, `/es/servicios/`, `/es/contacto/`, `/es/galeria/`

## Components and Interfaces

### Core Components

#### 1. Layout Component (`layouts/Layout.astro`)
- **Purpose**: Main wrapper providing consistent structure, theme management, and i18n setup
- **Features**:
  - Dynamic `<html lang="">` attribute based on current language
  - Theme detection and application
  - Meta tags for SEO and responsive design
  - View transitions setup
- **Props**: `title: string`, `lang: 'en' | 'es'`, `description?: string`

#### 2. Navigation Component (`components/navigation/Navigation.astro`)
- **Purpose**: Responsive navigation with language and theme toggles
- **Features**:
  - Mobile-first hamburger menu
  - Language switcher maintaining current page context
  - Theme toggle (light/dark/auto)
  - Active page highlighting
- **Props**: `currentLang: 'en' | 'es'`, `currentPath: string`

#### 3. Theme Manager (`components/common/ThemeManager.astro`)
- **Purpose**: Client-side script for theme detection and switching
- **Features**:
  - System preference detection
  - Timezone-based automatic theme selection
  - Local storage persistence
  - Smooth theme transitions

#### 4. Language Detector (`components/common/LanguageDetector.astro`)
- **Purpose**: Client-side language detection and redirection
- **Features**:
  - Browser language detection
  - Automatic redirection to appropriate language route
  - Fallback to default language (Spanish, as it's a Mexican company)

#### 5. Page Sections
- **Hero Section**: Company introduction with call-to-action
- **Services Section**: Educational puppet show offerings
- **About Section**: Founder story and mission
- **Contact Section**: Contact information and inquiry form
- **Gallery Section**: Performance photos and videos

### Interface Definitions

#### Theme Interface
```typescript
interface Theme {
  mode: 'light' | 'dark' | 'auto';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}
```

#### Language Interface
```typescript
interface LanguageConfig {
  code: 'en' | 'es';
  name: string;
  direction: 'ltr';
  routes: Record<string, string>;
}
```

## Data Models

### Color Palette System
Based on the provided colors (#540D6E, #EE4266, #FFD23F, #3BCEAC, #03QD69), the design will implement:

```css
:root {
  /* Base Colors */
  --color-primary: #540D6E;    /* Darkest - Primary brand */
  --color-secondary: #EE4266;  /* Secondary brand */
  --color-accent: #FFD23F;     /* Accent/highlights */
  --color-success: #3BCEAC;    /* Success states */
  --color-info: #03QD69;       /* Info/lightest */
  
  /* Light Theme */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --text-primary: #540D6E;
  --text-secondary: #6C757D;
  
  /* Dark Theme */
  --bg-primary-dark: #1A1A1A;
  --bg-secondary-dark: #2D2D2D;
  --text-primary-dark: #FFFFFF;
  --text-secondary-dark: #B0B0B0;
}
```

### Content Structure
```typescript
interface PageContent {
  title: string;
  description: string;
  sections: Section[];
}

interface Section {
  id: string;
  type: 'hero' | 'content' | 'gallery' | 'contact';
  content: string; // Lorem ipsum for prototype
  images?: string[];
}
```

### Navigation Structure
```typescript
interface NavigationItem {
  key: string;
  href: string;
  translationKey: string;
}
```

## Error Handling

### Language Fallback Strategy
1. **Primary**: User's browser language preference
2. **Secondary**: Geolocation-based language detection (Mexico → Spanish)
3. **Fallback**: Spanish (default for Mexican company)

### Theme Fallback Strategy
1. **Primary**: User's system preference (prefers-color-scheme)
2. **Secondary**: Timezone-based detection (day/night)
3. **Fallback**: Light theme

### Route Handling
- **404 Errors**: Custom 404 pages in both languages
- **Invalid Language Routes**: Redirect to default language equivalent
- **Missing Translations**: Fallback to default language content

## Testing Strategy

### Unit Testing
- **i18n Functions**: Test translation key resolution and fallbacks
- **Theme Utilities**: Test theme detection and switching logic
- **Component Props**: Test component rendering with different prop combinations

### Integration Testing
- **Navigation Flow**: Test navigation between pages maintains language context
- **Theme Persistence**: Test theme selection persists across page navigation
- **Language Switching**: Test language switching maintains current page context

### Accessibility Testing
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Screen Reader Compatibility**: Test with screen readers for proper content structure
- **Color Contrast**: Verify color combinations meet WCAG AA standards
- **Mobile Usability**: Test touch targets and mobile navigation

### Performance Testing
- **Page Load Speed**: Optimize for fast initial page loads
- **View Transitions**: Ensure smooth transitions don't impact performance
- **Image Optimization**: Implement responsive images and lazy loading

### Cross-Browser Testing
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Feature Fallbacks**: Ensure graceful degradation for unsupported features

### Responsive Design Testing
- **Mobile Devices**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+
- **Touch vs Mouse**: Different interaction patterns

## Implementation Considerations

### Performance Optimizations
- **Static Generation**: Leverage Astro's SSG for fast loading
- **Image Optimization**: Use Astro's image optimization features
- **CSS Optimization**: Minimize CSS and use efficient selectors
- **JavaScript Minimization**: Keep client-side JS minimal

### SEO Considerations
- **Meta Tags**: Proper meta tags for each language version
- **Structured Data**: Schema.org markup for business information
- **Sitemap**: Generate sitemaps for both language versions
- **Canonical URLs**: Proper canonical and hreflang tags

### Accessibility Features
- **ARIA Labels**: Proper ARIA labeling for interactive elements
- **Focus Management**: Logical focus order and visible focus indicators
- **Alt Text**: Descriptive alt text for all images
- **Language Declaration**: Proper lang attributes for content sections