export const providers = ['hero', 'lucide', 'mdi'] as const
export type Providers = (typeof providers)[number]
