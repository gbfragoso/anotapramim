import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	out: './src/lib/database/',
	schema: './src/lib/database/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		ssl: process.env.NODE_ENV === 'production' ? 'require' : undefined
	},
	verbose: true,
	strict: true
});
