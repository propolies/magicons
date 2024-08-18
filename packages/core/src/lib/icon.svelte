<script lang='ts'>
  import type { Icons } from './types.js'

  export let style = ""
  export let src: Icons
  let className = ""
  export { className as class }

  $: [id, path] = src.split("$")
  $: theme = (() => {
    const [isIcon, $icon, theme] = id.split("-")
    if (!isIcon) {
      throw new Error("[Magicon]: string matched non-icon: " + src)
    }
    return theme as keyof typeof viewBoxes
  })()

  const viewBoxes = {
    mini: "0 0 20 20",
    micro: "0 0 16 16"
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox={viewBoxes[theme] ?? "0 0 24 24"}
  class={className}
  {style}
>
  {@html path}
</svg>