import { InternalServerError, NotFoundError, ValidationError } from '$lib/infra/errors';
import session from '$lib/model/session';
import user from '$lib/model/user';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const sessionId = cookies.get('session_id') as string;
		const validSession = await session.findOneValidByToken(sessionId);
		const validUser = await user.findOneById(validSession.userId);
		return json(validUser, { status: 200 });
	} catch (error) {
		if (error instanceof ValidationError) {
			return json(error, { status: error.statusCode });
		}
		if (error instanceof NotFoundError) {
			return json(error, { status: error.statusCode });
		}
		console.log(error);
		return json(new InternalServerError({ cause: error as Error }));
	}
};
