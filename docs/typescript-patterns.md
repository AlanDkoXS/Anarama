# TypeScript Patterns and Standards

Este documento establece los patrones y estándares de TypeScript que deben seguirse en el proyecto Anarama.

## 1. Definición de Tipos Centralizados

### Ubicación de Tipos
- **Tipos globales**: `src/env.d.ts`
- **Tipos específicos de componentes**: En el mismo archivo del componente
- **Tipos compartidos**: Archivos dedicados en `src/types/`

### Ejemplo de Tipos Globales
```typescript
// src/env.d.ts
export type ThemeMode = 'light' | 'dark' | 'auto';
export type EffectiveTheme = 'light' | 'dark';
export type SupportedLanguage = 'en' | 'es';

// Interfaces para funcionalidad global
export interface ThemeManager {
  setTheme: (theme: ThemeMode) => void;
  getTheme: () => ThemeMode;
  getEffectiveThemePublic: () => EffectiveTheme;
}
```

## 2. Patrones de Tipado Estricto

### Union Types en lugar de Strings
❌ **Incorrecto:**
```typescript
function setTheme(theme: string) { ... }
```

✅ **Correcto:**
```typescript
function setTheme(theme: ThemeMode): void { ... }
```

### Tipado Explícito de Funciones
❌ **Incorrecto:**
```typescript
private init() {
  // función sin tipo de retorno
}
```

✅ **Correcto:**
```typescript
private init(): void {
  // función con tipo de retorno explícito
}
```

### Manejo de DOM y Eventos
❌ **Incorrecto:**
```typescript
const target = e.target as any;
```

✅ **Correcto:**
```typescript
const target = e.target as HTMLElement;
```

## 3. Extensión de Interfaces Globales

### Window Object
```typescript
declare global {
  interface Window {
    themeManager?: ThemeManager;
  }
}
```

### HTML Attributes (para Astro)
```typescript
declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes {
      'data-theme-toggle'?: ThemeMode;
    }
  }
}
```

## 4. Manejo de Tipos en Astro Components

### Definición de Props
```typescript
export interface Props {
  title: string;
  lang: SupportedLanguage;
  description?: string;
}

const { title, lang, description = "default" } = Astro.props;
```

### Scripts con Tipos
```typescript
<script>
  // Definir tipos locales si es necesario
  type LocalType = 'option1' | 'option2';
  
  // Usar tipos importados o globales
  class MyClass {
    private property: ThemeMode = 'auto';
    
    public method(param: LocalType): void {
      // implementación
    }
  }
</script>
```

## 5. Configuración TypeScript Estricta

### tsconfig.json Requerido
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 6. Patrones de Error Handling

### Type Guards
```typescript
function isThemeMode(value: string): value is ThemeMode {
  return ['light', 'dark', 'auto'].includes(value);
}

// Uso
const userInput = getUserInput();
if (isThemeMode(userInput)) {
  setTheme(userInput); // TypeScript sabe que es ThemeMode
}
```

### Null/Undefined Handling
```typescript
// Usar optional chaining y nullish coalescing
const browserLang = navigator.language || (navigator.languages?.[0]);
const langCode = browserLang?.toLowerCase().startsWith('es') ? 'es' : 'en';
```

## 7. Exportación de Tipos

### Para Reutilización
```typescript
// src/types/theme.ts
export type ThemeMode = 'light' | 'dark' | 'auto';
export type EffectiveTheme = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  autoDetect: boolean;
  persistPreference: boolean;
}
```

### Importación en Componentes
```typescript
import type { ThemeMode, ThemeConfig } from '../types/theme';
```

## 8. Validación y Testing

### Type Checking Script
```bash
pnpm run type-check  # Debe pasar sin errores
```

### ESLint Rules
- `@typescript-eslint/no-explicit-any: error`
- `@typescript-eslint/no-unused-vars: error`
- `@typescript-eslint/explicit-function-return-type: warn`

## 9. Mejores Prácticas

1. **Siempre definir tipos de retorno** en funciones públicas
2. **Usar union types** en lugar de strings genéricos
3. **Evitar `any`** completamente - usar `unknown` si es necesario
4. **Definir interfaces** para objetos complejos
5. **Usar type assertions** solo cuando sea absolutamente necesario
6. **Documentar tipos complejos** con comentarios JSDoc
7. **Mantener tipos cerca** de donde se usan cuando son específicos

## 10. Ejemplo Completo

```typescript
// src/components/example/TypedComponent.astro
---
import type { SupportedLanguage, ThemeMode } from '../../env';

export interface Props {
  language: SupportedLanguage;
  initialTheme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
}

const { 
  language, 
  initialTheme = 'auto',
  onThemeChange 
} = Astro.props;
---

<script>
  type ComponentState = {
    isInitialized: boolean;
    currentTheme: ThemeMode;
  };

  class TypedComponent {
    private state: ComponentState;

    constructor(initialTheme: ThemeMode) {
      this.state = {
        isInitialized: false,
        currentTheme: initialTheme
      };
    }

    public initialize(): void {
      this.state.isInitialized = true;
    }

    public updateTheme(theme: ThemeMode): void {
      this.state.currentTheme = theme;
    }
  }
</script>
```

Este patrón asegura que todo el código TypeScript sea estrictamente tipado, mantenible y libre de errores de tipo implícito.