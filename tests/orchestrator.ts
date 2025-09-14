import { db } from '$lib/database/connection';
import migration from '$lib/database/migration';
import customer from '$lib/model/customer';
import session from '$lib/model/session';
import user from '$lib/model/user';
import whatsapp from '$lib/model/whatsapp';
import { faker } from '@faker-js/faker';
import retry from 'async-retry';

async function waitForAllServices() {
	await waitForWebServer();
	await waitWhatsappAPI();

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

	async function waitWhatsappAPI() {
		return retry(fetchStatusPage, {
			retries: 100,
			maxTimeout: 1000
		});

		async function fetchStatusPage() {
			const response = await fetch('http://localhost:8080/');
			console.log('Waiting for whatsapp api to be ready...');
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
	try {
		await db.execute('delete from users;');
		await db.execute('delete from sessions;');
		await db.execute('delete from instances;');
		await db.execute('delete from customers;');
	} catch (error) {
		console.log(error);
		await migration.runPendingMigrations();
	}
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

async function createFakeWhatsappInstance(userId: string, instanceName: string) {
	return await whatsapp.createInstance(userId, instanceName);
}

async function createFakeCustomer(
	userId: string,
	data?: { name: string; email: string; phone: string; address: string }
) {
	const fakeCustomer = {
		name: data?.name || faker.internet.displayName(),
		email: data?.email || faker.internet.email(),
		phone: data?.phone || '73999999999',
		address: data?.address || faker.location.streetAddress()
	};
	return await customer.create(userId, fakeCustomer);
}

const orchestrator = {
	waitForAllServices,
	runPendingMigrations,
	clearDatabase,
	createFakeUser,
	createFakeSession,
	createFakeWhatsappInstance,
	createFakeCustomer
};

export { orchestrator };
