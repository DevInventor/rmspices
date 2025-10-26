/**
 * Post-build script to update 404.html with correct asset paths
 * This ensures GitHub Pages routing works correctly with hashed filenames
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

try {
  // Read the built index.html
  const indexHtml = fs.readFileSync(indexPath, 'utf-8');
  
  // Extract CSS and JS file paths from index.html
  const cssMatch = indexHtml.match(/<link rel="stylesheet" href="([^"]+)">/);
  const jsMatch = indexHtml.match(/<script type="module" crossorigin src="([^"]+)">/);
  
  if (!cssMatch || !jsMatch) {
    console.log('Could not find CSS or JS assets in index.html');
    process.exit(0);
  }
  
  const cssPath = cssMatch[1];
  const jsPath = jsMatch[1];
  
  console.log('Found assets:');
  console.log('  CSS:', cssPath);
  console.log('  JS:', jsPath);
  
  // Read the 404.html
  const four04Path = path.join(distDir, '404.html');
  let four04Html = fs.readFileSync(four04Path, 'utf-8');
  
  // Replace placeholder values with actual paths
  four04Html = four04Html.replace(
    /href="\/rmspices\/assets\/index-CSS_HASH.css"/g,
    `href="/rmspices${cssPath}"`
  );
  
  four04Html = four04Html.replace(
    /href="\/rmspices\/assets\/index-JS_HASH.js"/g,
    `href="/rmspices${jsPath}"`
  );
  
  // Write the updated 404.html
  fs.writeFileSync(four04Path, four04Html);
  
  console.log('✅ Successfully updated 404.html with correct asset paths');
} catch (error) {
  // If 404.html doesn't exist in dist yet, that's okay - Vite will copy it from public
  if (error.code === 'ENOENT') {
    console.log('ℹ️  404.html not found in dist, will be copied from public');
    process.exit(0);
  } else {
    console.error('❌ Error updating 404.html:', error.message);
    process.exit(1);
  }
}

