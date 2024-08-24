<script lang='ts'>
  import type { Icons } from './types.js'

  export let style = ""
  export let src: Icons
  let className = ""
  export { className as class }

  $: opts = src as any as {
    width?: number,
    height?: number,
    body: string
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  width="1.5rem"
  stroke-width="1.5px"
  viewBox={`0 0 ${opts.width ?? "24"} ${opts.height ?? "24"}`}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  {style}
>
  {@html opts.body}
</svg>