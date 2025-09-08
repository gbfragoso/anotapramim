import { beforeAll, describe, expect, test } from 'vitest';
import { orchestrator } from '../../../orchestrator';

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.runPendingMigrations();
	await orchestrator.clearDatabase();
});

describe('GET /api/v1/user', () => {
	describe('Default user', () => {
		test('With valid session', async () => {
			const createdUser = await orchestrator.createFakeUser({
				username: 'UserWithValidSession'
			});
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
	});
});
