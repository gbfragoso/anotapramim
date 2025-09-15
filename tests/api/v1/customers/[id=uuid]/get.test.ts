import session from '$lib/model/session';
import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { orchestrator } from '../../../../orchestrator';

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.runPendingMigrations();
	await orchestrator.clearDatabase();
});

describe('GET Customers', () => {
	describe('Authorized user', () => {
		test('With valid ID', async () => {
			const fakeUser = await orchestrator.createFakeUser();
			const fakeSession = await orchestrator.createFakeSession(fakeUser.id);
			const fakeCustomer = await orchestrator.createFakeCustomer(fakeUser.id);

			const response = await fetch(`http://localhost:5173/api/v1/customers/${fakeCustomer.id}`, {
				headers: {
					Cookie: `session_id=${fakeSession.token}`,
					'Content-Type': 'application/json'
				}
			});

			expect(response.status).toBe(200);
			const body = await response.json();
			expect(body).toEqual({
				id: fakeCustomer.id,
				name: body.name,
				phone: body.phone,
				address: body.address,
				email: body.email,
				birthday: null,
				cpf: null,
				userId: fakeUser.id,
				createdAt: body.createdAt,
				updatedAt: body.updatedAt
			});
		});
		test('With invalid data', async () => {
			const fakeUser = await orchestrator.createFakeUser();
			const fakeSession = await orchestrator.createFakeSession(fakeUser.id);
			const fakeCustomer = {
				name: faker.internet.displayName(),
				email: 'teste'
			};

			const response = await fetch('http://localhost:5173/api/v1/customers', {
				method: 'POST',
				headers: {
					Cookie: `session_id=${fakeSession.token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(fakeCustomer)
			});

			expect(response.status).toBe(400);
		});
	});
	describe('Anonymous user', () => {
		test('With invalid token', async () => {
			const response = await fetch('http://localhost:5173/api/v1/customers', {
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

			const response = await fetch('http://localhost:5173/api/v1/customers', {
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
