<script lang="ts">
  import type { Icons } from '@magicons/shared'
  import type { SVGAttributes } from 'svelte/elements'

  let {
    src,
    ...svgAttributes
  }: {
    src: Icons
  } & SVGAttributes<SVGSVGElement> = $props()

  const opts = $state(src) as any as {
    width?: number
    height?: number
    body: string
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  width="1.5rem"
  height="1.5rem"
  stroke-width="1.5px"
  viewBox={`0 0 ${opts.width ?? '24'} ${opts.height ?? '24'}`}
  stroke-linecap="round"
  stroke-linejoin="round"
  {...svgAttributes}>
  {@html opts.body}
</svg>
