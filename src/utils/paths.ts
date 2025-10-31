/**
 * Utility functions for handling paths, especially for GitHub Pages deployment
 * with a base path.
 */

/**
 * Normalizes an asset path to work correctly with the base URL.
 * Handles both development (base = '/') and production (base = '/rmspices/') environments.
 * 
 * @param path - The asset path (e.g., '/assets/products/image.png')
 * @returns The normalized path with the base URL prepended if needed
 * 
 * @example
 * normalizePath('/assets/products/image.png')
 * // Development: '/assets/products/image.png'
 * // Production: '/rmspices/assets/products/image.png'
 */
export function normalizePath(path: string | undefined | null): string {
  if (!path) return '';
  
  // If it's already a full URL (http/https), return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Get the base URL from Vite's environment variable
  const baseUrl = import.meta.env.BASE_URL;
  
  // Remove trailing slash from base URL if present
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // If base is '/', just return the path
  if (base === '/') {
    return normalizedPath;
  }
  
  // Otherwise, prepend the base URL
  return `${base}${normalizedPath}`;
}

/**
 * Normalizes image paths for products.
 * This is a convenience function that specifically handles product image paths.
 * 
 * @param imagePath - The image path from the products.json file
 * @returns The normalized path
 */
export function normalizeImagePath(imagePath: string | undefined | null): string {
  return normalizePath(imagePath);
}

