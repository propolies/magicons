<script lang='ts'>
  import { twMerge } from 'tailwind-merge'
  import type { Icons } from './types.js'

  let {
    src,
    class: className,
    ...props
  }: {
    src: Icons
    class?: string,
    style?: string
  } = $props()

  const [id, path] = src.split("$")
  const [isIcon, icon, theme] = id.split("-")
  if (isIcon !== "icon") {
    throw new Error("String mathced a non icon: " + src)
  }

  const viewBoxes = {
    mini: "0 0 20 20",
    micro: "0 0 16 16"
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox={theme ?
    viewBoxes[theme as keyof typeof viewBoxes]
    : "0 0 24 24"
  }
  class="{twMerge("stroke-[1.5px] size-6", className)}"
  {...props}
>
  {@html path}
</svg>