import { db } from '$lib/database/connection';
import { customers } from '$lib/database/schema';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

const schema = z.object({
	name: z
		.string('Formato de nome de usuário inválido')
		.max(100)
		.nonoptional('Obrigatório o preenchimento do nome do cliente'),
	phone: z.string().max(50).nonoptional('Obrigatório o preenchimento do telefone'),
	address: z.string().max(200).nonoptional('Obrigatório o preenchimento do endereço'),
	email: z.string('Email inválido.').max(72, 'Endereço de email muito grande'),
	birthday: z.string().optional(),
	cpf: z.string().max(11).optional()
});

async function create(
	userId: string,
	data: {
		name: string;
		phone: string;
		address: string;
		email: string;
		birthday?: string;
		cpf?: string;
	}
) {
	const result = await db
		.insert(customers)
		.values({
			name: data.name,
			phone: data.phone,
			address: data.address,
			email: data.email,
			birthday: data.birthday ? new Date(data.birthday) : undefined,
			cpf: data.cpf,
			userId
		})
		.returning();
	return result[0];
}

async function fetch(userId: string, id: string) {
	const result = await db
		.select()
		.from(customers)
		.where(and(eq(customers.userId, userId), eq(customers.id, id)));
	return result[0];
}

async function remove(userId: string, id: string) {
	const result = await db
		.delete(customers)
		.where(and(eq(customers.userId, userId), eq(customers.id, id)))
		.returning();
	return result[0];
}

const customer = {
	schema,
	create,
	fetch,
	remove
};

export default customer;
