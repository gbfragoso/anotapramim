import { db } from '$lib/database/connection';
import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function runPendingMigrations() {
	await migrate(db, { migrationsFolder: './src/lib/database' });
}

async function clearDatabase() {
	await db.execute(sql`drop schema if exists drizzle cascade;`);
	await db.execute(sql`drop schema if exists public cascade;`);
	await db.execute(sql`create schema public;`);
}

const orchestrator = {
	runPendingMigrations,
	clearDatabase
};

export { orchestrator };
