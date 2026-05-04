/* eslint @typescript-eslint/no-explicit-any: 0 */
import { describe, expect, it } from 'vitest'
import { magicons } from 'magicons'

const { transform } = magicons()
const normalise = (s: string = '') => s?.replaceAll('\n', '').replace(/\s\s+/g, ' ')

describe('preprocessor should work with svelte', () => {
  it('should work', async () => {
    const res = transform(
      `
        <script>
          import { Icon } from '@magicons/svelte'
        </script>

        <Icon src={"@hero-ChevronDown"} />  
      `,
      'src/+page.svelte',
    )
    expect(normalise(res?.code)).toEqual(
      normalise(`
      <script>
        import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
        import { Icon } from '@magicons/svelte'
      </script>

      <Icon src={hero_ChevronDown} />
    `),
    )
  })

  it('should work with variables', async () => {
    const res = transform(
      `
        <script>
          import { Icon, type Icons } from '@magicons/svelte'

          const icon: Icons = "@hero-ChevronDown"
        </script>

        <Icon src={icon} />  
      `,
      'src/+page.svelte',
    )
    expect(normalise(res?.code)).toEqual(
      normalise(`
      <script>
        import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
        import { Icon, type Icons } from '@magicons/svelte'

        const icon: Icons = hero_ChevronDown
      </script>

      <Icon src={icon} /> 
    `),
    )
  })

  it('should work with ternary operator', async () => {
    const res = transform(
      `
        <script>
          import { Icon } from '@magicons/svelte'
        </script>

        <Icon src={up ? "@hero-ChevronUp" : "@hero-ChevronDown"} />  
      `,
      'src/+page.svelte',
    )
    expect(normalise(res?.code)).toEqual(
      normalise(`
      <script>
        import hero_ChevronUp from '@magicons/hero-icons/icons/ChevronUp.json';
        import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
        import { Icon } from '@magicons/svelte'
      </script>

      <Icon src={up ? hero_ChevronUp : hero_ChevronDown} /> 
    `),
    )
  })
})

describe('preprocessor should work', () => {
  it('should work with duplicate icons', async () => {
    const res = transform(
      `
        "@hero-ChevronDown" "@hero-ChevronDown"
      `,
      'src/file.ts',
    )
    expect(normalise(res?.code)).toEqual(
      normalise(`
      import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
      hero_ChevronDown hero_ChevronDown
    `),
    )
  })

  it('should work with themes', async () => {
    const res = transform(
      `
        const icon = "@hero-ChevronDown-micro"
      `,
      'src/file.ts',
    )
    expect(normalise(res?.code)).toEqual(
      normalise(`
      import hero_ChevronDown_micro from '@magicons/hero-icons/icons/ChevronDown-micro.json';
      const icon = hero_ChevronDown_micro
    `),
    )
  })

  it('should work with other providers', async () => {
    const res = transform(
      `
        "@lucide-ChevronDown"
      `,
      'src/file.ts',
    )
    expect(normalise(res?.code)).toEqual(
      normalise(`
      import lucide_ChevronDown from '@magicons/lucide-icons/icons/ChevronDown.json';
      lucide_ChevronDown
    `),
    )
  })

  it('should work with multiple providers', async () => {
    const res = transform(
      `
        "@hero-ChevronDown" "@lucide-ChevronDown"
      `,
      'src/file.ts',
    )
    expect(normalise(res?.code)).toEqual(
      normalise(`
      import hero_ChevronDown from '@magicons/hero-icons/icons/ChevronDown.json';
      import lucide_ChevronDown from '@magicons/lucide-icons/icons/ChevronDown.json';
      hero_ChevronDown lucide_ChevronDown
    `),
    )
  })

  it('should work with single quotes', async () => {
    const res = transform(
      `
        const icon = "@hero-Check"
      `,
      'src/file.ts',
    )
    expect(normalise(res?.code)).toEqual(
      normalise(`
      import hero_Check from '@magicons/hero-icons/icons/Check.json';
      const icon = hero_Check
    `),
    )
  })
})
