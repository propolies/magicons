/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { magicons } from '@magicons/core/plugins'

const plugin = magicons().markup
const normalise = (s: string = "") => s?.replaceAll("\n", "").replace(/\s\s+/g, ' ')

describe('preprocessor should work with svelte', () => {
  it("should work", async () => {
    const res = plugin({
      content: `
        <script>
          import { Icon } from '@magicons/core'
        </script>

        <Icon src={"@hero-ChevronDown"} />  
      `,
      filename: "src/+page.svelte"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
      <script>
        import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
        import { Icon } from '@magicons/core'
      </script>

      <Icon src={hero_ChevronDown} />
    `))
  })

  it("should work with variables", async () => {
    const res = plugin({
      content: `
        <script>
          import { Icon, type Icons } from '@magicons/core'

          const icon: Icons = "@hero-ChevronDown"
        </script>

        <Icon src={icon} />  
      `,
      filename: "src/+page.svelte"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
      <script>
        import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
        import { Icon, type Icons } from '@magicons/core'

        const icon: Icons = hero_ChevronDown
      </script>

      <Icon src={icon} /> 
    `))
  })
})

describe("preprocessor should work", () => {
  it("should work with duplicate icons", async () => {
    const res = plugin({
      content: `
        "@hero-ChevronDown" "@hero-ChevronDown"
      `,
      filename: "src/file.ts"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
      import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
      hero_ChevronDown hero_ChevronDown
    `))
  })

  it("should work with themes", async () => {
    const res = plugin({
      content: `
        const icon = "@hero-ChevronDown-micro"
      `,
      filename: "src/file.ts"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
      import hero_ChevronDown_micro from '@magicons/hero-icons/icons/ChevronDown-micro.json';
      const icon = hero_ChevronDown_micro
    `))
  })

  it("should work with other providers", async () => {
    const res = plugin({
      content: `
        "@lucide-ChevronDown"
      `,
      filename: "src/file.ts"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
      import lucide_ChevronDown from '@magicons/lucide-icons/icons/ChevronDown.json';
      lucide_ChevronDown
    `))
  })

  it("should work with multiple providers", async () => {
    const res = plugin({
      content: `
        "@hero-ChevronDown" "@lucide-ChevronDown"
      `,
      filename: "src/file.ts"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
      import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
      import lucide_ChevronDown from '@magicons/lucide-icons/icons/ChevronDown.json';
      hero_ChevronDown lucide_ChevronDown
    `))
  })

  it("should work with plain string", async () => {
    const res = plugin({
      content: `
        <Icon src="@hero-ChevronDown" />
      `,
      filename: "src/file.ts"
    })
    expect(normalise(res?.code)).toEqual(normalise(`
      import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
      <Icon src={hero_ChevronDown} />
    `))
  })
})

















































































































