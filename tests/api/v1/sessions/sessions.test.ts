import { beforeAll, describe, expect, test } from 'vitest';
import { orchestrator } from '../../../orchestrator';
import session from '$lib/model/session';

beforeAll(async () => {
	await orchestrator.waitForAllServices();
	await orchestrator.runPendingMigrations();
	await orchestrator.clearDatabase();
});

describe('POST /api/v1/sessions', () => {
	describe('Anonymous user', () => {
		test('With incorrect `email` but correct `password`', async () => {
			await orchestrator.createFakeUser({
				password: 'senha-correta'
			});

			const response = await fetch('http://localhost:5173/api/v1/sessions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: 'teste@teste.com.br',
					password: 'senha-correta'
				})
			});

			expect(response.status).toBe(401);
			const body = await response.json();
			expect(body).toEqual({
				name: 'UnauthorizedError',
				message: 'Credenciais inválidas',
				action: 'Verifique as informações e tente novamente.',
				status_code: 401
			});
		});

		test('With correct `email` but incorrect `password`', async () => {
			await orchestrator.createFakeUser({
				email: 'email-correto@teste.com.br'
			});

			const response = await fetch('http://localhost:5173/api/v1/sessions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: 'email-correto@teste.com.br',
					password: 'senha-incorreta'
				})
			});

			expect(response.status).toBe(401);
			const body = await response.json();
			expect(body).toEqual({
				name: 'UnauthorizedError',
				message: 'Credenciais inválidas',
				action: 'Verifique as informações e tente novamente.',
				status_code: 401
			});
		});

		test('With incorrect `email` and incorrect `password`', async () => {
			const response = await fetch('http://localhost:5173/api/v1/sessions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: 'email-incorreto@teste.com.br',
					password: 'senha-incorreta'
				})
			});

			expect(response.status).toBe(401);
			const body = await response.json();
			expect(body).toEqual({
				name: 'UnauthorizedError',
				message: 'Credenciais inválidas',
				action: 'Verifique as informações e tente novamente.',
				status_code: 401
			});
		});

		test('With correct `email` and correct `password`', async () => {
			await orchestrator.createFakeUser({
				email: 'email-correto2@teste.com.br',
				password: 'senha-correta'
			});

			const response = await fetch('http://localhost:5173/api/v1/sessions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: 'email-correto2@teste.com.br',
					password: 'senha-correta'
				})
			});

			expect(response.status).toBe(200);

			const body = await response.json();
			expect(Date.parse(body.expiresAt)).not.toBeNaN();
			expect(Date.parse(body.createdAt)).not.toBeNaN();
			expect(Date.parse(body.updatedAt)).not.toBeNaN();

			const expiresAt = new Date(body.expiresAt).setMilliseconds(0);
			const createdAt = new Date(body.createdAt).setMilliseconds(0);
			expect(expiresAt - createdAt).toBe(session.EXPIRATION_IN_MILLISECONDS);

			expect(body).toEqual({
				id: body.id,
				token: body.token,
				userId: body.userId,
				expiresAt: body.expiresAt,
				createdAt: body.createdAt,
				updatedAt: body.updatedAt
			});
		});
	});
});
