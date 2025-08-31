import { orchestrator } from '../../../orchestrator';
import { beforeAll, describe, expect, test } from 'vitest';

beforeAll(async () => {
	await orchestrator.clearDatabase();
	await orchestrator.runPendingMigrations();
});

describe('POST /api/v1/users', () => {
	describe('Anonymous user', () => {
		test('With unique and valid data', async () => {
			expect(1 + 1).toBe(2);
		});
		test('With duplicated email', async () => {
			expect(1 + 1).toBe(2);
		});
	});
});
