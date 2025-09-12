import { env } from '$env/dynamic/private';
import { db } from '$lib/database/connection';
import { instances } from '$lib/database/schema';
import { ValidationError } from '$lib/infra/errors';
import type Instance from '$lib/interfaces/instance';
import { and, eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = env.WHATSAPP_URL;
const webhook = env.WHATSAPP_WEBHOOK;
const apikey = env.WHATSAPP_API_KEY;
const proxy_host = env.PROXY_HOST;
const proxy_port = env.PROXY_PORT;
const proxy_protocol = env.PROXY_PROTOCOL;
const proxy_username = env.PROXY_USERNAME;
const proxy_password = env.PROXY_PASSWORD;

async function createInstance(userId: string, name: string) {
	const id = uuidv4();

	const response = await fetch(`${baseUrl}/instance/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			apikey: apikey as string
		},
		body: JSON.stringify({
			instanceName: id,
			integration: 'WHATSAPP-BAILEYS',
			groupsIgnore: true,
			alwaysOnline: true,
			readMessages: true,
			readStatus: true,
			webhook: { url: webhook, base64: true, events: ['MESSAGES_UPSERT'] },
			proxyHost: proxy_host,
			proxyPort: proxy_port,
			proxyProtocol: proxy_protocol,
			proxyUsername: proxy_username,
			proxyPassword: proxy_password
		})
	});

	const body = await response.json();
	if (body.status) {
		throw new ValidationError(body.response.message);
	}

	const createdInstance = await db.insert(instances).values({ id, name, userId }).returning();
	return createdInstance[0];
}

async function fetchInstances(userId: string) {
	const response = await fetch(`${baseUrl}/instance/fetchInstances`, {
		headers: {
			'Content-Type': 'application/json',
			apikey: apikey as string
		}
	});

	const userInstances = await db
		.select({ name: instances.id })
		.from(instances)
		.where(eq(instances.userId, userId));

	const userInstancesArray = userInstances.map((row) => row.name);
	const body = await response.json();
	const result = body
		.filter((instance: Instance) => userInstancesArray.includes(instance.name))
		.map((user: Instance) => {
			return {
				name: user.name,
				owner: user.ownerJid,
				profileName: user.profileName,
				status: user.connectionStatus
			};
		});
	return result;
}

async function deleteInstance(userId: string, name: string) {
	const deletedInstance = await db
		.delete(instances)
		.where(and(eq(instances.userId, userId), eq(instances.id, name)))
		.returning();

	if (deletedInstance) {
		await fetch(`${baseUrl}/instance/delete/${name}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				apikey: apikey as string
			}
		});
	}

	return deletedInstance[0];
}

const whatsapp = {
	createInstance,
	fetchInstances,
	deleteInstance
};

export default whatsapp;
