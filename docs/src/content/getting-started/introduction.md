---
description: Fast, typesafe Icon wrapper for svelte.
---

## What is Magicons?
Magicons is a fast and modifiable icon wrapper around multiple icon providers.

This makes it super easy to **magically** import icons.

Eg. magicons will look for strings in the form 

```ts
"@hero-ChevronDown"
```
And transform it into:
```ts
import hero_ChevronDown from '@magicons/hero-icons/ChevronDown.json'
hero_ChevronDown
```

## Usage
```svelte
<script lang="ts">
  import { Icon, type Icon } from '@magicons/core'

  const icon: Icon = "@hero-ChevronDown"
</script>

<Icon src={icon} class="size-8" />
```
The icons are fully compatible with tailwind.