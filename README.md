# magicons - [npm](https://www.npmjs.com/package/@magicons/core)

Fast, typesafe Icon wrapper for **svelte**.

## Features

- 📦 **Lightweight** - Install only icon packs you need with zero dependencies
- ⚡ **Preprocess** - Get instant icons in development
- 🌴 **Treeshakeable** - Only used icons will remain
- 🧙‍♂️ **Typesafe** - Full typesafety and autocompletion for applied icon packs
- 💨 **TailwindCSS** - Full Tailwind support

## Inlcuded Icon packs

- [Hero](https://heroicons.com/) - [npm](https://www.npmjs.com/package/@magicons/hero-icons)
- [Lucide](https://lucide.dev/icons/) - [npm](https://www.npmjs.com/package/@magicons/lucide-icons)

## Setup

```js
// svelte.config.js
import { magicons } from '@magicons/core/plugins'

const config = {
  // add the preprocessor
  preprocess: [magicons(), vitePreprocess()],
}
```

```ts
// src/app.d.ts
import '@magicons/pack-icons'
```

eg. `import "@magicons/hero-icons"`

## Example Usage

To use the hero-icons pack

```svelte
<script>
  import { Icon, type Icons } from '@magicons/core'
  const icon: Icons = '@hero-ChevronDown'
</script>

<Icon src={icon} class="size-12" />
```

All strings matching the pattern `"@pack-"` will generate the correct imports making this extremely fast.

## Caveat

For props always maintain brackets i.e `<Component prop={"@pack-icon"} />`

## Filling icons

Some icons require the underlying paths to be filled, this can easily be done using tailwind classes

- `[&>element]:class` - `>` targets direct children
- `[&_element]:class` - `_` targets all children

For more information check out the [TailwindCSS docs - arbitrary-variants](https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants)
