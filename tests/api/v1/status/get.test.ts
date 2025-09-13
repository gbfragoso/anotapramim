import { beforeAll, describe, expect, test } from 'vitest';
import { orchestrator } from '../../../orchestrator';

beforeAll(async () => {
	await orchestrator.waitForAllServices();
});

describe('GET /api/v1/status', () => {
	describe('Anonymous user', () => {
		test('Retrieving current system status', async () => {
			const response = await fetch('http://localhost:5173/api/v1/status');
			expect(response.status).toBe(200);

			const responseBody = await response.json();

			const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
			expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

			expect(responseBody.dependencies.database.version).toEqual('17.5');
			expect(responseBody.dependencies.database.max_connections).toEqual(100);
		});
	});
});
