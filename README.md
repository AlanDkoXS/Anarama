# Compañía de Títeres Anarama - Website

Educational puppet theater company website built with Astro, featuring multilingual support (Spanish/English) and responsive design.

## 🚀 Project Setup

This project **exclusively uses pnpm** as the package manager. Using npm or yarn will be blocked by the preinstall script.

### Prerequisites

- Node.js 18+ 
- pnpm 8.0.0+ (install with `npm install -g pnpm`)

### Installation

```bash
# Install dependencies (only pnpm allowed)
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Package Manager Enforcement

- The project includes a `preinstall` script that blocks npm/yarn usage
- `.npmrc` is configured for optimal pnpm settings
- `package.json` specifies pnpm as the required package manager

## 🌐 Internationalization

The website supports two languages:
- **Spanish (es)** - Default language
- **English (en)**

Routes are structured as:
- `/es/` - Spanish pages
- `/en/` - English pages

## 🎨 Design System

The project uses a custom color palette:
- Primary: `#540D6E` (Dark purple)
- Secondary: `#EE4266` (Pink)
- Accent: `#FFD23F` (Yellow)
- Success: `#3BCEAC` (Teal)
- Info: `#03QD69` (Light green)

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Shared components
│   ├── navigation/       # Navigation components
│   └── sections/         # Page section components
├── layouts/
│   └── Layout.astro      # Main layout
├── pages/
│   ├── en/              # English pages
│   └── es/              # Spanish pages
├── i18n/
│   ├── ui.ts            # Translation keys
│   └── utils.ts         # i18n utilities
├── styles/
│   ├── global.css       # Global styles and CSS variables
│   └── components/      # Component-specific styles
└── assets/
    └── images/          # Image assets
```

## 🛠 Development

- **Framework**: Astro 5.11.1
- **Package Manager**: pnpm (exclusively enforced)
- **Styling**: CSS with Custom Properties
- **TypeScript**: Strict mode with enhanced type checking
- **Internationalization**: Built-in Astro i18n

### TypeScript Configuration

This project uses **strict TypeScript** configuration with:
- No implicit `any` types allowed
- Unused variables/parameters flagged as errors
- Exact optional property types
- Strict null checks and function types
- Enhanced type safety with additional compiler options

📖 **See [TypeScript Patterns Guide](docs/typescript-patterns.md)** for detailed coding standards and patterns.

## 📝 Available Scripts

```bash
pnpm run dev        # Start development server
pnpm run build      # Build for production
pnpm run preview    # Preview production build
pnpm run astro      # Run Astro CLI commands
pnpm run type-check # Run TypeScript type checking
pnpm run lint       # Run ESLint for code quality
pnpm run lint:fix   # Run ESLint and fix issues automatically
```

## 🎭 About Compañía de Títeres Anarama

Founded by Lic. Adriana Pacheco Hernández, this puppet theater company specializes in educational shows for children, particularly reaching underprivileged communities in Chihuahua, Mexico.