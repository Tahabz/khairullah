import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// Output directory where static files will be generated
			fallback: 'index.html', // Important for SPA mode - all routes redirect to index.html
			pages: 'build', // Output directory for the built pages
			assets: 'build', // Output directory for assets
			precompress: false // Set to true if you want to precompress files
		}),
		// Disable SSR entirely
		prerender: { default: false }
	}
};

export default config;
