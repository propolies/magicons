---
description: Installation process.
---

## Install
```
pnpm add @magicons/core @magicons/hero-icons
```
Add the preprocessor to svelte
```ts file=svelte.config.js
import { magicons } from '@magicons/core/plugins'

const config = {
  preprocess: [magicons()]
}
```
To get the correct Icon types you have to import the providers in `app.d.ts` like.
```ts file=app.d.ts
import '@magicons/core/hero-icons'
```

## Supported Icon libraries
```
pnpm add @magicons/hero-icons
```
```
pnpm add @magicons/lucide-icons
```