---
description: Installition process.
---

## Install
```
pnpm add @magicon/core @magicon/hero-icons
```
Add the preprocessor to svelte
```ts file=svelte.config.js
import { magicon } from '@magicon/core/plugins'

const config = {
  preprocess: [magicon()]
}
```
To get the correct Icon types you have to import the providers in `app.d.ts` like.
```ts file=app.d.ts
import '@magicon/core/hero-icons'
```