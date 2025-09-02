import retry from 'async-retry';
import { db } from '$lib/database/connection';
import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function waitForAllServices() {
	await waitForWebServer();

	async function waitForWebServer() {
		return retry(fetchStatusPage, {
			retries: 100,
			maxTimeout: 1000
		});

		async function fetchStatusPage() {
			const response = await fetch('http://localhost:5173/api/v1/status');
			console.log('Waiting for web server to be ready...');
			if (response.status !== 200) {
				throw Error();
			}
		}
	}
}

async function runPendingMigrations() {
	await migrate(db, { migrationsFolder: './src/lib/database' });
}

async function clearDatabase() {
	await db.execute(sql`drop schema if exists drizzle cascade;`);
	await db.execute(sql`drop schema if exists public cascade;`);
	await db.execute(sql`create schema public;`);
}

const orchestrator = {
	waitForAllServices,
	runPendingMigrations,
	clearDatabase
};

export { orchestrator };
