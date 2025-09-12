import { db } from '$lib/database/connection';
import { sessions } from '$lib/database/schema';
import { UnauthorizedError } from '$lib/infra/errors';
import crypto from 'crypto';
import { and, eq, gte, sql } from 'drizzle-orm';

const EXPIRATION_IN_MILLISECONDS = 60 * 60 * 24 * 1000; // 1 Day

async function create(userId: string) {
	const token = crypto.randomBytes(48).toString('hex');
	const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

	const session = await db
		.insert(sessions)
		.values({
			token,
			userId,
			expiresAt
		})
		.returning();

	return session[0];
}

async function findOneValidByToken(token: string) {
	const session = await db
		.select()
		.from(sessions)
		.where(and(eq(sessions.token, token), gte(sessions.expiresAt, sql<Date>`NOW()`)))
		.limit(1);

	return session[0];
}

async function validateSession(sessionId: string) {
	if (!sessionId) {
		throw new UnauthorizedError({
			message: 'Usuário não possui sessão ativa.',
			action: 'Verifique se este usuário está logado e tente novamente'
		});
	}
	const validSession = await session.findOneValidByToken(sessionId);
	if (!validSession) {
		throw new UnauthorizedError({
			message: 'Usuário não possui sessão ativa.',
			action: 'Verifique se este usuário está logado e tente novamente'
		});
	}
	return validSession;
}

const session = {
	EXPIRATION_IN_MILLISECONDS,
	create,
	findOneValidByToken,
	validateSession
};

export default session;
