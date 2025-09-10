import {
	InternalServerError,
	NotFoundError,
	UnauthorizedError,
	ValidationError
} from '$lib/infra/errors';
import session from '$lib/model/session';
import user from '$lib/model/user';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const sessionId = cookies.get('session_id') as string;
		const validSession = await session.findOneValidByToken(sessionId);
		if (!validSession) {
			throw new UnauthorizedError({
				message: 'Usuário não possui sessão ativa.',
				action: 'Verifique se este usuário está logado e tente novamente'
			});
		}
		const validUser = await user.findOneById(validSession.userId);
		return json(validUser, { status: 200 });
	} catch (error) {
		if (
			error instanceof ValidationError ||
			error instanceof NotFoundError ||
			error instanceof UnauthorizedError
		) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};
