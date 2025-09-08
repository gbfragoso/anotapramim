import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL as string, {
	ssl: env.NODE_ENV === 'production' ? 'require' : undefined,
	onnotice: () => {}
});

export const db = drizzle(client, { schema });
