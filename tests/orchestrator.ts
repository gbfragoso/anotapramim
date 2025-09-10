import { db } from '$lib/database/connection';
import migration from '$lib/database/migration';
import session from '$lib/model/session';
import user from '$lib/model/user';
import { faker } from '@faker-js/faker';
import retry from 'async-retry';

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
	await migration.runPendingMigrations();
}

async function clearDatabase() {
	await db.execute('delete from users;');
	await db.execute('delete from sessions;');
}

async function createFakeUser(data?: { username?: string; email?: string; password?: string }) {
	return await user.create({
		username: data?.username || faker.internet.username().replace(/[_.-]/g, ''),
		email: data?.email || faker.internet.email(),
		password: data?.password || 'validpassword'
	});
}

async function createFakeSession(userId: string) {
	return await session.create(userId);
}

const orchestrator = {
	waitForAllServices,
	runPendingMigrations,
	clearDatabase,
	createFakeUser,
	createFakeSession
};

export { orchestrator };
