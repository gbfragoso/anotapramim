import { db } from '$lib/database/connection';
import { users } from '$lib/database/schema';
import { lower } from '$lib/database/utils';
import { InternalServerError, NotFoundError, ValidationError } from '$lib/infra/errors';
import password from '$lib/model/password';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const userSchema = z.object({
	username: z.string('Formato de nome de usuário inválido').max(32, 'Nome de usuário muito grande'),
	email: z.email('Email inválido.').max(72, 'Endereço de email muito grande'),
	password: z.string()
});

async function create(data: { username: string; email: string; password: string }) {
	try {
		if (!data.username || !data.email || !data.password) {
			throw new ValidationError({ message: 'Dados obrigatórios não foram fornecidos.' });
		}

		const validatedInput = userSchema.safeParse(data);
		if (!validatedInput.success) {
			throw new ValidationError({
				message: 'Verifique as informações dos campos',
				fieldErrors: z.flattenError(validatedInput.error).fieldErrors
			});
		}

		await validateUniqueEmail(data.email);
		await validateUniqueUsername(data.username);
		data.password = await password.hash(data.password);

		const result = await db.insert(users).values(data).returning();
		return result[0];
	} catch (error) {
		if (error instanceof ValidationError) {
			throw error;
		}
		throw new InternalServerError({ cause: error as Error });
	}
}

async function findOneById(id: string) {
	const result = await db.select().from(users).where(eq(users.id, id));

	if (result.length === 0) {
		throw new NotFoundError({
			message: 'O id informado não foi encontrado no sistema',
			action: 'Verifique se o email está digitado corretamente.'
		});
	}
	return result[0];
}

async function findOneByEmail(email: string) {
	const result = await db
		.select()
		.from(users)
		.where(eq(lower(users.email), email.toLowerCase()));

	if (result.length === 0) {
		throw new NotFoundError({
			message: 'O email informado não foi encontrado no sistema',
			action: 'Verifique se o email está digitado corretamente.'
		});
	}
	return result[0];
}

async function findOneByUsername(username: string) {
	const result = await db
		.select()
		.from(users)
		.where(eq(lower(users.username), username.toLowerCase()));

	if (result.length === 0) {
		throw new NotFoundError({
			message: 'O username informado não foi encontrado no sistema',
			action: 'Verifique se o username está digitado corretamente.'
		});
	}
	return result[0];
}

async function validateUniqueEmail(email: string) {
	try {
		const existingUser = await findOneByEmail(email);
		if (existingUser) {
			throw new ValidationError({
				message: 'O email informado já está em uso.',
				action: 'Utilize outro email.'
			});
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
			throw new ValidationError({
				message: 'O nome de usuário informado já está em uso.',
				action: 'Utilize outro nome de usuário.'
			});
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
	findOneById,
	findOneByEmail,
	findOneByUsername
};

export default user;
