# magicons
Fast, typesafe Icon wrapper for **svelte**.

## Features
- Tailwindcss support
- Preprocess for instant icons in dev
- Treeshakeable

## Inlcuded Icon packs
- [Hero](https://heroicons.com/) - [npm](https://www.npmjs.com/package/@magicons/hero-icons)
- [Lucide](https://lucide.dev/icons/) - [npm](https://www.npmjs.com/package/@magicons/lucide-icons)

## Usage
```svelte
<script>
  import { Icon, type Icons } from "@magicons/core"
  const icon: Icons = "@hero-ChevronDown"
</script>

<Icon src={icon} class="size-12" />
```

Eg. all strings matching the pattern `@hero-` will generate the correct imports making this extremely fast.

Read more in the [docs](https://propolies.github.io/magicons/docs/getting-started/introduction)
