import { z } from 'zod'

// Utility constants
export const imageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
]

export function sortStrings(a: string, b: string): number {
    return a.localeCompare(b);
}

export function sortByName<T extends { name: string }>(a: T, b: T): number {
    return a.name.localeCompare(b.name);
}
