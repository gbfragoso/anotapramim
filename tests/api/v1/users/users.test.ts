import { orchestrator } from '../../../orchestrator';
import { beforeAll, describe, test } from 'vitest';

beforeAll(async () => {
	await orchestrator.clearDatabase();
	await orchestrator.runPendingMigrations();
});

describe('POST /api/v1/users', () => {
	describe('Anonymous user', () => {
		test('With unique and valid data', async () => {});
		test('With duplicated email', async () => {});
	});
});
