---
description: Fast, typesafe Icon wrapper for svelte.
---

## What is Magicon?
Magicon is created to speed up dev-mode and prevent importing each icon individually to stop cold-starts.

This makes it super easy to **magically** import icons.

For example magicon will look for strings in the form 

```ts
const icon: Icons = "@hero-ChevronDown"
```
Into:
```ts
import ChevronDown from '@magicon/hero-icons/ChevronDown.svg?raw'

const icon = ChevronDown
```

## Usage
```svelte
<script lang="ts">
  import { Icon, type Icon } from '@magicon/core'

  const icon: Icon = "@hero-ChevronDown"
</script>

<Icon src={icon} class="size-8" />
```
It's that simple, for now just make sure to always include brackets. like `src={"@hero-ChevronDown"}` instead of `src="@hero-ChevronDown"`

## Future of Magicon
Since this is a preprocessor a lot is possible, and a lot can change, if there's a feature or a change that would be nice let me know on github or discord: `propoli`