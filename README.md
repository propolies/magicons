# magicon

Fast, typesafe Icon wrapper for **svelte**.

## Features
- Tailwindcss support
- Heroicons
- Preprocess for instant icons in dev mode

## Usage
```svelte
<script>
  import { Icon, type Icons } from "@magicon/core"
  const icon: Icons = "@hero-ChevronDown"
</script>

<Icon src={icon} class="size-12" />
```

All string matching the pattern `@hero-` will generate the correct imports, thus making this extremely fast.

Read more in the [docs](https://propolies.github.io/magicon/docs/getting-started/introduction)