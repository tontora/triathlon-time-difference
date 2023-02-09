import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const isDev = process.env.IS_DEVELOPMENT;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		appDir: 'app',
		adapter: adapter(),
		paths: {
			base: isDev ? '' : '/triathlon-time-difference',
		},
	},
};

export default config;
