# magicon

Fast, typesafe Icon wrapper for **svelte**.

## Features
- Tailwindcss support
- Preprocess for instant icons in dev mode

## Inlcuded Icon packs
- [Hero](https://heroicons.com/) - [npm](https://www.npmjs.com/package/@magicon/hero-icons)
- [Lucide](https://lucide.dev/icons/) - [npm](https://www.npmjs.com/package/@magicon/lucide-icons)
- [Logos](https://github.com/gilbarbara/logos) - [npm](https://www.npmjs.com/package/@magicon/logos-icons)

## Usage
```svelte
<script>
  import { Icon, type Icons } from "@magicon/core"
  const icon: Icons = "@hero-ChevronDown"
</script>

<Icon src={icon} class="size-12" />
```

For example all strings matching the pattern `@hero-` will generate the correct imports making this extremely fast.

Read more in the [docs](https://propolies.github.io/magicon/docs/getting-started/introduction)