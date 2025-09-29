import session from '$lib/model/session';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { orchestrator } from '../../../../../orchestrator';

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.runPendingMigrations();
	await orchestrator.clearDatabase();
});

describe('DELETE instances', () => {
	describe('Authorized user', () => {
		test('With one instance', async () => {
			const testUser = await orchestrator.createFakeUser();
			const session = await orchestrator.createFakeSession(testUser.id);
			const fakeInstance = await orchestrator.createFakeWhatsappInstance(testUser.id, 'vitest');
			const response = await fetch(
				`http://localhost:5173/api/v1/instances/whatsapp/${fakeInstance.id}`,
				{
					method: 'DELETE',
					headers: {
						Cookie: `session_id=${session.token}`,
						'Content-Type': 'application/json'
					}
				}
			);

			expect(response.status).toBe(200);

			const body = await response.json();
			expect(body).toEqual({
				id: fakeInstance.id,
				name: fakeInstance.name,
				userId: testUser.id,
				createdAt: body.createdAt,
				updatedAt: body.updatedAt
			});
		});
	});
	describe('Unauthorized user', () => {
		test('With invalid token', async () => {
			const response = await fetch(
				'http://localhost:5173/api/v1/instances/whatsapp/6943bdc6-4088-4ade-8d2a-604315114df1',
				{
					method: 'DELETE',
					headers: {
						Cookie:
							'session_id=858c1b18538dc75daca929ddfd4b21b5a75ec799bdacb59e01d10103ffb1f29fc10c6e4bbb76a91d52d7d00d2abb93d3',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						instanceName: 'ValidInstanceName'
					})
				}
			);

			expect(response.status).toBe(401);
		});
		test('With expired session', async () => {
			const createdUser = await orchestrator.createFakeUser();
			vi.useFakeTimers({ toFake: ['Date'] });
			vi.setSystemTime(new Date(Date.now() - session.EXPIRATION_IN_MILLISECONDS));
			const fakeSession = await orchestrator.createFakeSession(createdUser.id);
			vi.useRealTimers();

			const response = await fetch(
				'http://localhost:5173/api/v1/instances/whatsapp/6943bdc6-4088-4ade-8d2a-604315114df1',
				{
					method: 'DELETE',
					headers: {
						Cookie: `session_id=${fakeSession.token}`
					},
					body: JSON.stringify({
						instanceName: 'ValidInstanceName'
					})
				}
			);
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
