import { InternalServerError, UnauthorizedError, ValidationError } from '$lib/infra/errors';
import customer from '$lib/model/customer';
import session from '$lib/model/session';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, params }) => {
	try {
		const sessionId = cookies.get('session_id') as string;
		const validSession = await session.validateSession(sessionId);
		const result = await customer.fetch(validSession.userId, params.id);

		return json(result, { status: 200 });
	} catch (error) {
		if (error instanceof ValidationError || error instanceof UnauthorizedError) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};

export const DELETE: RequestHandler = async ({ cookies, params }) => {
	try {
		const sessionId = cookies.get('session_id') as string;
		const validSession = await session.validateSession(sessionId);
		const result = await customer.remove(validSession.userId, params.id);

		return json(result, { status: 200 });
	} catch (error) {
		if (error instanceof ValidationError || error instanceof UnauthorizedError) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};
