import session from '$lib/model/session';
import auth from '$lib/model/auth';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { InternalServerError, ValidationError } from '$lib/infra/errors';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const user = await auth.getAuthenticatedUser(data.email, data.password);
		const result = await session.create(user.id);
		return json(result, { status: 201 });
	} catch (error) {
		if (error instanceof ValidationError) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError(error as Error));
	}
};
