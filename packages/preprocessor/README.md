# magicons - [npm](https://www.npmjs.com/package/magicons)

Fast, typesafe Icon wrapper and preprocessor for **Vite** projects.

## Features

- 📦 **Lightweight** - Install only icon packs you need with zero dependencies
- ⚡ **Preprocess** - Get instant icons in development
- 🌴 **Treeshakeable** - Only used icons will remain
- 🧙‍♂️ **Typesafe** - Full typesafety and autocompletion for applied icon packs
- 💨 **TailwindCSS** - Full Tailwind support

## Installation

### 1. Add Preprocessor

`pnpm add magicons -D`

```ts
// vite.config.ts
import { magicons } from 'magicons'
import { defineConfig } from "vite"

export default defineConfig({
    // run the preprocessor first
	plugins: [magicons(), ...],
})
```

### 2. Choose Icon wrapper

| Framework                     | npm                                                                |
| ----------------------------- | ------------------------------------------------------------------ |
| [Svelte](https://svelte.dev/) | [@magicons/svelte](https://www.npmjs.com/package/@magicons/svelte) |
| [Kiru](https://kirujs.dev/)   | [@magicons/kiru](https://www.npmjs.com/package/@magicons/kiru)     |
| [React](https://react.dev/)   | [@magicons/react](https://www.npmjs.com/package/@magicons/react)   |

eg. `pnpm add @magicons/svelte -D`

### 3. Choose Icon Packs

| Icon Pack                                      | npm                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------ |
| [Hero](https://heroicons.com/)                 | [@magicons/hero-icons](https://www.npmjs.com/package/@magicons/hero-icons)     |
| [Lucide](https://lucide.dev/icons/)            | [@magicons/lucide-icons](https://www.npmjs.com/package/@magicons/lucide-icons) |
| [Mdi](https://pictogrammers.com/library/mdi//) | [@magicons/mdi-icons](https://www.npmjs.com/package/@magicons/mdi-icons)       |

eg. `pnpm add @magicons/hero-icons -D`

### 4. Import Icon Types

```ts
// src/app.d.ts
import '@magicons/hero-icons'
import '@magicons/lucide-icons'
import '@magicons/mdi-icons'
// import only the ones you use
```

or

```ts
// tsconfig.json
{
  compilerOptions: {
    types: ['@magicons/hero-icons', '@magicons/lucide-icons', '@magicons/mdi-icons']
  }
}
```

## Example Usage

To use the **Hero-icons** pack in **Svelte** using **pnpm**

```
pnpm add magicons @magicons/svelte @magicons/hero-icons -D
```

```ts
// src/app.d.ts
import '@magicons/hero-icons'
```

```ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { magicons } from 'magicons'

export default defineConfig({
  plugins: [magicons(), sveltekit()],
})
```

## How it works

Every string matching the patter `@pack-Icon` will be transformed into an import and svg.

## Caveat with Svelte

All props should maintain brackets i.e `<Component prop={"@pack-icon"} />`

## Filling icons

Some icons require the underlying paths to be filled, this can easily be done using tailwind classes

- `[&>element]:class` - `>` targets direct children
- `[&_element]:class` - `_` targets all children

For more information check out the [TailwindCSS docs - arbitrary-variants](https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants)
