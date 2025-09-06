import session from '$lib/model/session';
import auth from '$lib/model/auth';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	InternalServerError,
	ValidationError,
	NotFoundError,
	UnauthorizedError
} from '$lib/infra/errors';

export const POST: RequestHandler = async ({ cookies, request }) => {
	try {
		const data = await request.json();
		if (!data.email || !data.password) {
			throw new ValidationError({
				message: 'Usuário e senha são obrigatórios',
				action: 'Favor preencher todos os campos'
			});
		}

		const user = await auth.getAuthenticatedUser(data.email, data.password);
		const result = await session.create(user.id);

		cookies.set('session_id', result.token, {
			path: '/',
			maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true
		});

		return json(result, { status: 200 });
	} catch (error) {
		if (error instanceof ValidationError) {
			return json(error, { status: error.statusCode });
		}
		if (error instanceof UnauthorizedError) {
			return json(error, { status: 401 });
		}
		if (error instanceof NotFoundError) {
			return json(new UnauthorizedError({ cause: error }), { status: 401 });
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};
