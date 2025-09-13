import { InternalServerError, UnauthorizedError, ValidationError } from '$lib/infra/errors';
import session from '$lib/model/session';
import whatsapp from '$lib/model/whatsapp';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ cookies, params }) => {
	try {
		const sessionId = cookies.get('session_id') as string;
		const validSession = await session.validateSession(sessionId);
		const instance = await whatsapp.deleteInstance(validSession.userId, params.id);

		return json(instance, { status: 200 });
	} catch (error) {
		if (error instanceof ValidationError || error instanceof UnauthorizedError) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};

export const PUT: RequestHandler = async ({ cookies, params }) => {
	try {
		const sessionId = cookies.get('session_id') as string;
		await session.validateSession(sessionId);
		const instances = await whatsapp.restartInstance(params.id);

		return json(instances, { status: 200 });
	} catch (error) {
		if (error instanceof ValidationError || error instanceof UnauthorizedError) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};
