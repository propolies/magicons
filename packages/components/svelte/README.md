# Magicons - Svelte

## Installation

`pnpm add magicons @magicons/svelte -D`

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
// src/app.d.ts
// import only the ones you use
import '@magicons/hero-icons'
import '@magicons/lucide-icons'
import '@magicons/mdi-icons'
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
// vite.config.ts
import { defineConfig } from 'vite'
import { magicons } from 'magicons'

export default defineConfig({
  plugins: [magicons(), ...],
})
```

```svelte
<script lang="ts">
  import { Icon, type Icons } from '@magicons/svelte'

  const icon: Icons = '@hero-ChevronDown'
</script>

<Icon src={icon} />
<Icon src={'@hero-ChevronUp'} />
```

## Caveat with Svelte

All props should maintain brackets i.e `<Component prop={"@pack-icon"} />`
