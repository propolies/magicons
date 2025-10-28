# Magicons - Kiru

## Installation

`pnpm add magicons @magicons/kiru -D`

### 1. Add the preprocessor

```ts
// vite.config.ts
import { magicons } from 'magicons'
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [magicons(), ...],
})
```

### 2. Choose Icon Packs

| Icon Pack                                      | npm                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------ |
| [Hero](https://heroicons.com/)                 | [@magicons/hero-icons](https://www.npmjs.com/package/@magicons/hero-icons)     |
| [Lucide](https://lucide.dev/icons/)            | [@magicons/lucide-icons](https://www.npmjs.com/package/@magicons/lucide-icons) |
| [Mdi](https://pictogrammers.com/library/mdi//) | [@magicons/mdi-icons](https://www.npmjs.com/package/@magicons/mdi-icons)       |

eg. `pnpm add @magicons/hero-icons -D`

### 3. Import Icon Types

```ts
// tsconfig.json
{
  compilerOptions: {
    // keep only the ones you use
    types: ['@magicons/hero-icons', '@magicons/lucide-icons', '@magicons/mdi-icons']
  }
}
```

## Example Usage

To use the **Hero-icons** pack in **Kiru** using **pnpm**

```
pnpm add magicons @magicons/kiru @magicons/hero-icons -D
```

```ts
// tsconfig.app.json
{
  compilerOptions: {
    types: ['@magicons/hero-icons']
  }
}
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { magicons } from 'magicons'

export default defineConfig({
  plugins: [magicons(), ...],
})
```

```tsx
import { Icon, type Icons } from '@magicons/kiru'

export function Component() {
  const icon: Icons = "@hero-ChevronDown"

  return (
    <Icon src={icon} />
    <Icon src="@hero-ChevronUp" />
  )
}
```
