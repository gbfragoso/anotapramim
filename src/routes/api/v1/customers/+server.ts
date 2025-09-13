import { InternalServerError, UnauthorizedError, ValidationError } from '$lib/infra/errors';
import customer from '$lib/model/customer';
import session from '$lib/model/session';
import { json } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, request }) => {
	try {
		const sessionId = cookies.get('session_id') as string;
		const validSession = await session.validateSession(sessionId);
		const data = await request.json();
		const validatedData = customer.schema.parse(data);
		const result = await customer.create(validSession.userId, validatedData);

		return json(result, { status: 200 });
	} catch (error) {
		if (error instanceof ValidationError || error instanceof UnauthorizedError) {
			return json(error, { status: 401 });
		}
		if (error instanceof ZodError) {
			throw new ValidationError({
				message: 'Verifique as informações dos campos',
				fieldErrors: z.flattenError(error).fieldErrors
			});
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};
