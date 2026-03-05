#!/usr/bin/env node

/**
 * Build script for creating a standalone Web Components bundle
 * This creates a single JS file that can be used in Blazor and other non-Angular frameworks
 */

const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const distPath = path.join(__dirname, '..', 'dist', 'icons');
const bundlePath = path.join(distPath, 'bundles');

// Ensure the bundles directory exists
if (!fs.existsSync(bundlePath)) {
  fs.mkdirSync(bundlePath, { recursive: true });
}

async function buildWebComponentsBundle() {
  try {
    console.log('Building Web Components bundle...');

    await esbuild.build({
      entryPoints: [path.join(__dirname, '..', 'projects', 'icons', 'src', 'standalone.ts')],
      bundle: true,
      outfile: path.join(bundlePath, 'hviktor-icons.js'),
      format: 'iife',
      globalName: 'HvictorIcons',
      platform: 'browser',
      target: 'es2020',
      minify: true,
      sourcemap: true,
      external: [],
    });

    console.log('✅ Web Components bundle created successfully!');
    console.log(`📦 Location: ${path.join(bundlePath, 'hviktor-icons.js')}`);
  } catch (error) {
    console.error('❌ Error building Web Components bundle:', error);
    process.exit(1);
  }
}

buildWebComponentsBundle();
