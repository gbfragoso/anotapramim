import { version as uuidv4 } from 'uuid';
import { beforeAll, describe, expect, test } from 'vitest';
import { orchestrator } from '../../../orchestrator';
import password from '$lib/model/password';

beforeAll(async () => {
	await orchestrator.clearDatabase();
	await orchestrator.runPendingMigrations();
});

describe('POST /api/v1/users', () => {
	describe('Anonymous user', () => {
		test('With unique and valid data', async () => {
			const response = await fetch('http://localhost:5173/api/v1/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: 'newuser',
					email: 'teste@teste.com.br',
					password: 'admin123'
				})
			});

			expect(response.status).toBe(201);
			const body = await response.json();
			expect(body).toEqual({
				id: body.id,
				username: 'newuser',
				email: 'teste@teste.com.br',
				password: body.password,
				role: body.role,
				referrer: body.referrer,
				apikey: body.apikey,
				createdAt: body.createdAt,
				updatedAt: body.updatedAt
			});

			await password.hash('admin123');
			expect(await password.verify(body.password, 'admin123')).toBe(true);
			expect(uuidv4(body.id)).toBe(4);
			expect(Date.parse(body.createdAt)).not.toBeNaN();
			expect(Date.parse(body.updatedAt)).not.toBeNaN();
		});

		test('With duplicated username', async () => {
			const response1 = await fetch('http://localhost:5173/api/v1/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: 'duplicateduser1',
					email: 'duplicateduser1@teste.com.br',
					password: 'admin123'
				})
			});

			expect(response1.status).toBe(201);

			const response2 = await fetch('http://localhost:5173/api/v1/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: 'duplicateduser1',
					email: 'duplicateduser2@teste.com.br',
					password: 'admin123'
				})
			});

			expect(response2.status).toBe(400);
		});

		test('With duplicated email', async () => {
			const response1 = await fetch('http://localhost:5173/api/v1/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: 'duplicatedemail1',
					email: 'duplicatedemail1@teste.com.br',
					password: 'admin123'
				})
			});

			expect(response1.status).toBe(201);

			const response2 = await fetch('http://localhost:5173/api/v1/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: 'duplicatedemail2',
					email: 'duplicatedemail1@teste.com.br',
					password: 'admin123'
				})
			});

			expect(response2.status).toBe(400);
		});

		test('With invalid email format', async () => {
			const response = await fetch('http://localhost:5173/api/v1/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: 'testuser',
					email: 'invalid-email',
					password: 'admin123'
				})
			});
			expect(response.status).toBe(400);
		});

		test('With empty required fields', async () => {
			const response = await fetch('http://localhost:5173/api/v1/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: '',
					email: '',
					password: ''
				})
			});
			expect(response.status).toBe(400);
		});
	});
});
