import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { fetch } from 'cross-fetch';
import { resolve } from 'path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
global.fetch = fetch;

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: ['tests/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['tests/**/*.{test,spec}.{js,ts}']
				},
				resolve: {
					alias: {
						$lib: resolve('./src/lib')
					}
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['tests/**/*.{test,spec}.{js,ts}'],
					exclude: ['tests/**/*.svelte.{test,spec}.{js,ts}'],
					env: loadEnv('', process.cwd(), ''),
					testTimeout: 10000
				},
				resolve: {
					alias: {
						$lib: resolve('./src/lib')
					}
				}
			}
		]
	}
});
