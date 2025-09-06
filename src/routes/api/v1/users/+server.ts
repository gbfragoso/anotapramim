import user from '$lib/model/user';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { InternalServerError, ValidationError } from '$lib/infra/errors';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const result = await user.create(data);
		return json(result, { status: 201 });
	} catch (error) {
		if (error instanceof ValidationError) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};
