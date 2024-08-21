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
        import ChevronDown from '@magicon/hero-icons/icons/ChevronDown.svg?raw';
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
        import ChevronDown from '@magicon/hero-icons/icons/ChevronDown.svg?raw';
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
        import ChevronDown_micro from '@magicon/hero-icons/icons/ChevronDown-micro.svg?raw';
        import { Icon, type Icons } from '@magicon/core'

        const icon: Icons = ChevronDown_micro
      </script>

      <Icon src={icon} /> 
    `))
  })

  it("should work in ts/js files", async () => {
    const res = plugin({
      content: `
        import { type Icons } from '@magicon/core'

        function getIcon(): Icons {
          const bool = true
          return bool ? "@hero-ChevronDown" : "@hero-ChevronUp"
        }
      `,
      filename: "src/file.ts"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
        import ChevronDown from '@magicon/hero-icons/icons/ChevronDown.svg?raw';
        import ChevronUp from '@magicon/hero-icons/icons/ChevronUp.svg?raw';
        import { type Icons } from '@magicon/core'

        function getIcon(): Icons {
          const bool = true
          return bool ? ChevronDown : ChevronUp
        }
      `))
  })

  it("should work with other providers", async () => {
    const res = plugin({
      content: `
        <script>
          import { Icon } from '@magicon/core'
        </script>

        <Icon src={"@lucide-ChevronDown"} />  
      `,
      filename: "src/+page.svelte"
    })
    expect(normalise(res?.code ?? "")).toEqual(normalise(`
      <script>
        import ChevronDown from '@magicon/lucide-icons/icons/ChevronDown.svg?raw';
        import { Icon } from '@magicon/core'
      </script>

      <Icon src={ChevronDown} />
    `))
  })
})