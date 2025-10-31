// Utility function for className merging
export function cn(...classes: (string | undefined | null | false | 0)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Path normalization utilities
export { normalizePath, normalizeImagePath } from './paths';

