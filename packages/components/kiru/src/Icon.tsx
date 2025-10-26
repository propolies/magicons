import type { Icons } from '@magicons/shared'
import type { ElementProps } from 'kiru'

export function Icon({
  src,
  ...rest
}: {
  src: Icons
} & ElementProps<'svg'>) {
  const opts: {
    width?: number
    height?: number
    body: string
  } = src as any

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="1.5rem"
      height="1.5rem"
      stroke-width="1.5px"
      viewBox={`0 0 ${opts.width ?? '24'} ${opts.height ?? '24'}`}
      stroke-linecap="round"
      stroke-linejoin="round"
      innerHTML={opts.body}
      {...rest}></svg>
  )
}
