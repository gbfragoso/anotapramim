import { db } from '$lib/database/connection';
import user from '$lib/model/user';
import { faker } from '@faker-js/faker';
import retry from 'async-retry';
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
	await db.execute(
		'drop schema if exists drizzle cascade; drop schema if exists public cascade; create schema public;'
	);
}

async function createFakeUser(data?: { username?: string; email?: string; password?: string }) {
	return await user.create({
		username: data?.username || faker.internet.username().replace(/[_.-]/g, ''),
		email: data?.email || faker.internet.email(),
		password: data?.password || 'validpassword'
	});
}

const orchestrator = {
	waitForAllServices,
	runPendingMigrations,
	clearDatabase,
	createFakeUser
};

export { orchestrator };
