import { InternalServerError, UnauthorizedError, ValidationError } from '$lib/infra/errors';
import session from '$lib/model/session';
import whatsapp from '$lib/model/whatsapp';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, request }) => {
	try {
		const sessionId = cookies.get('session_id') as string;
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

		const data = await request.json();
		if (!data.instanceName) {
			throw new ValidationError({ message: 'O nome da instância é obrigatório' });
		}
		const instance = await whatsapp.createInstance(validSession.userId, data.instanceName);

		return json(instance, { status: 201 });
	} catch (error) {
		console.log(error);
		if (error instanceof ValidationError || error instanceof UnauthorizedError) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};

export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const sessionId = cookies.get('session_id') as string;
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

		const instances = await whatsapp.fetchInstances(validSession.userId);

		return json(instances, { status: 200 });
	} catch (error) {
		console.log(error);
		if (error instanceof ValidationError || error instanceof UnauthorizedError) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError({ cause: error as Error }));
	}
};
