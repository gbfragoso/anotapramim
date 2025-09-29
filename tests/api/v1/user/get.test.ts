import session from '$lib/model/session';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { orchestrator } from '../../../orchestrator';

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.runPendingMigrations();
	await orchestrator.clearDatabase();
});

describe('GET /api/v1/user', () => {
	describe('Default user', () => {
		test('With valid session', async () => {
			const createdUser = await orchestrator.createFakeUser();
			const session = await orchestrator.createFakeSession(createdUser.id);

			const response = await fetch('http://localhost:5173/api/v1/user', {
				headers: {
					Cookie: `session_id=${session.token}`
				}
			});
			expect(response.status).toBe(200);

			const body = await response.json();
			expect(body).toEqual({
				id: createdUser.id,
				username: createdUser.username,
				email: createdUser.email,
				password: body.password,
				referrer: null,
				apikey: null,
				createdAt: createdUser.createdAt,
				updatedAt: createdUser.updatedAt
			});
		});
		test('With invalid session', async () => {
			const token =
				'2002d02e0b45536c502156a713c2d3eb2248502ba56982a2173d10e9d7d2f75794b60ef9dd356a1d7b91860b14d5dfed';

			const response = await fetch('http://localhost:5173/api/v1/user', {
				headers: {
					Cookie: `session_id=${token}`
				}
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
		test('With expired session', async () => {
			const createdUser = await orchestrator.createFakeUser();
			vi.useFakeTimers({ toFake: ['Date'] });
			vi.setSystemTime(new Date(Date.now() - session.EXPIRATION_IN_MILLISECONDS));
			const fakeSession = await orchestrator.createFakeSession(createdUser.id);
			vi.useRealTimers();

			const response = await fetch('http://localhost:5173/api/v1/user', {
				headers: {
					Cookie: `session_id=${fakeSession.token}`
				}
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
