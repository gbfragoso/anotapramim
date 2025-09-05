import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

async function runPendingMigrations() {
	const client = postgres(env.DATABASE_URL, {
		max: 1,
		ssl: process.env.NODE_ENV === 'production' ? 'require' : undefined,
		onnotice: () => {}
	});

	const db = drizzle(client);
	try {
		await migrate(db, { migrationsFolder: './src/lib/database' });
		console.log('Migration completed ✅');
	} catch (error) {
		console.error('Nothing to migrate ✅');
	} finally {
		await client.end();
	}
}

const migration = {
	runPendingMigrations
};

export default migration;
