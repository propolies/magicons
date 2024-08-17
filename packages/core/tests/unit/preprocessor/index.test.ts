/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { magicon } from '@magicon/core/plugins'

const plugin = magicon().markup

const normalise = (s?: string) => s?.replaceAll("\n", "").replace(/\s\s+/g, ' ')

describe('preprocessor should work', () => {
  it("should import correct icon", async () => {
    const res = plugin({
      content: `
        <script>
          import { Icon } from '@magicon/core'
        </script>

        <Icon src={"@hero-ChevronDown"} />  
      `,
      filename: "src/+page.svelte"
    })
    expect(normalise(res?.code ?? "")).toEqual(normalise(`
      <script>
        import ChevronDown from '@magicon/hero-icons/ChevronDown.svg?raw';
        import { Icon } from '@magicon/core'
      </script>

      <Icon src={ChevronDown} />
    `))
  })

  it("should import correct icon in script", async () => {
    const res = plugin({
      content: `
        <script>
          import { Icon, type Icons } from '@magicon/core'

          const icon: Icons = "@hero-ChevronDown"
        </script>

        <Icon src={icon} />  
      `,
      filename: "src/+page.svelte"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
      <script>
        import ChevronDown from '@magicon/hero-icons/ChevronDown.svg?raw';
        import { Icon, type Icons } from '@magicon/core'

        const icon: Icons = ChevronDown
      </script>

      <Icon src={icon} /> 
    `))
  })

  it("should import correct theme", async () => {
    const res = plugin({
      content: `
        <script>
          import { Icon, type Icons } from '@magicon/core'

          const icon: Icons = "@hero-ChevronDown-micro"
        </script>

        <Icon src={icon} />  
      `,
      filename: "src/+page.svelte"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
      <script>
        import ChevronDown_micro from '@magicon/hero-icons/ChevronDown-micro.svg?raw';
        import { Icon, type Icons } from '@magicon/core'

        const icon: Icons = ChevronDown_micro
      </script>

      <Icon src={icon} /> 
    `))
  })
})