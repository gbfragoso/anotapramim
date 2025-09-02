import { db } from '$lib/database/connection';
import { users } from '$lib/database/schema';
import { lower } from '$lib/database/utils';
import { InternalServerError, NotFoundError, ValidationError } from '$lib/infra/errors';
import password from '$lib/model/password';
import { eq } from 'drizzle-orm';

async function create(data: any) {
	try {
		if (!data.username || !data.email || !data.password) {
			throw new ValidationError('Dados obrigatórios não foram fornecidos.');
		}
		if (!data.role) {
			data.role = 'user';
		}

		await validateUniqueEmail(data.email);
		await validateUniqueUsername(data.username);
		data.password = await password.hash(data.password);

		const result = await db.insert(users).values(data).returning();
		return result[0];
	} catch (error) {
		console.log(error);
		if (error instanceof ValidationError) {
			throw error;
		}
		throw new InternalServerError(error as Error);
	}
}

async function update(data: any) {
	try {
		if (!data.username || !data.email || !data.password) {
			throw new ValidationError('Dados obrigatórios não foram fornecidos.');
		}

		await validateUniqueEmail(data.email);
		await validateUniqueUsername(data.username);
		data.password = await password.hash(data.password);

		const result = await db.update(users).set(data).returning();
		return result[0];
	} catch (error) {
		if (error instanceof ValidationError) {
			throw error;
		}
		throw new InternalServerError(error as Error);
	}
}

async function findOneByEmail(email: string) {
	const result = await db
		.select()
		.from(users)
		.where(eq(lower(users.email), email.toLowerCase()));

	if (result.length === 0) {
		throw new NotFoundError(
			'O id informado não foi encontrado no sistema',
			'Verifique se o email está digitado corretamente.'
		);
	}
	return result[0];
}

async function findOneByUsername(username: string) {
	const result = await db
		.select()
		.from(users)
		.where(eq(lower(users.username), username.toLowerCase()));

	if (result.length === 0) {
		throw new NotFoundError(
			'O id informado não foi encontrado no sistema',
			'Verifique se o email está digitado corretamente.'
		);
	}
	return result[0];
}

async function validateUniqueEmail(email: string) {
	try {
		const existingUser = await findOneByEmail(email);
		if (existingUser) {
			throw new ValidationError('O email informado já está em uso.', 'Utilize outro email.');
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			return;
		}
		throw error;
	}
}

async function validateUniqueUsername(username: string) {
	try {
		const existingUser = await findOneByUsername(username);
		if (existingUser) {
			throw new ValidationError(
				'O nome de usuário informado já está em uso.',
				'Utilize outro nome de usuário.'
			);
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			return;
		}
		throw error;
	}
}

const user = {
	create,
	findOneByEmail,
	findOneByUsername
};

export default user;
