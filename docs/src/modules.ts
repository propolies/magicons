import type { Component } from "svelte"

type Modules = Record<string, () => Promise<{
  default: Component,
  metadata: {
    title: string,
    description: string
  }
}>>

export const modules = import.meta.glob("/src/content/**/*md") as Modules
