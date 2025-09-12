import session from '$lib/model/session';
import whatsapp from '$lib/model/whatsapp';
import { version as uuidv4 } from 'uuid';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { orchestrator } from '../../../../orchestrator';

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.runPendingMigrations();
	await orchestrator.clearDatabase();
});

describe('POST Create instance', () => {
	describe('Authorized user', () => {
		test('With valid data', async () => {
			const testUser = await orchestrator.createFakeUser({
				username: 'WhastappPostInstanceTest'
			});
			const session = await orchestrator.createFakeSession(testUser.id);
			const response = await fetch('http://localhost:5173/api/v1/instances/whatsapp', {
				method: 'POST',
				headers: {
					Cookie: `session_id=${session.token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					instanceName: 'vitest'
				})
			});

			expect(response.status).toBe(201);

			const body = await response.json();
			expect(uuidv4(body.userId)).toBe(4);
			expect(Date.parse(body.createdAt)).not.toBeNaN();
			expect(Date.parse(body.updatedAt)).not.toBeNaN();

			expect(body).toEqual({
				id: body.id,
				name: body.name,
				userId: body.userId,
				createdAt: body.createdAt,
				updatedAt: body.updatedAt
			});

			await whatsapp.deleteInstance(testUser.id, body.id);
		});
	});
	describe('Unauthorized user', () => {
		test('With invalid token', async () => {
			const response = await fetch('http://localhost:5173/api/v1/instances/whatsapp', {
				method: 'POST',
				headers: {
					Cookie:
						'session_id=858c1b18538dc75daca929ddfd4b21b5a75ec799bdacb59e01d10103ffb1f29fc10c6e4bbb76a91d52d7d00d2abb93d3',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					instanceName: 'ValidInstanceName'
				})
			});

			expect(response.status).toBe(401);
		});
		test('With expired session', async () => {
			const createdUser = await orchestrator.createFakeUser();
			vi.useFakeTimers({ toFake: ['Date'] });
			vi.setSystemTime(new Date(Date.now() - session.EXPIRATION_IN_MILLISECONDS));
			const fakeSession = await orchestrator.createFakeSession(createdUser.id);
			vi.useRealTimers();

			const response = await fetch('http://localhost:5173/api/v1/instances/whatsapp', {
				method: 'POST',
				headers: {
					Cookie: `session_id=${fakeSession.token}`
				},
				body: JSON.stringify({
					instanceName: 'ValidInstanceName'
				})
			});
			expect(response.status).toBe(401);

			const body = await response.json();
			expect(body).toEqual({
				name: 'UnauthorizedError',
				message: 'Usuário não possui sessão ativa.',
				action: 'Verifique se este usuário está logado e tente novamente',
				status_code: 401
			});
		});
	});
});
