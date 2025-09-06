import { InternalServerError, UnauthorizedError } from '$lib/infra/errors';
import password from '$lib/model/password';
import user from '$lib/model/user';

async function getAuthenticatedUser(email: string, password: string) {
	try {
		const storedUser = await user.findOneByEmail(email);
		await validatePassword(storedUser.password, password);
		return storedUser;
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			throw new UnauthorizedError({
				message: 'Credenciais inválidas',
				action: 'Verifique as informações e tente novamente.'
			});
		}
		throw error;
	}
}

async function validatePassword(providedPassword: string, storedHashedPassword: string) {
	try {
		const isPasswordValid = await password.verify(providedPassword, storedHashedPassword);
		if (!isPasswordValid) {
			throw new UnauthorizedError({
				message: 'Senha inválida',
				action: 'Verifique se a senha esta correta.'
			});
		}
	} catch (error) {
		throw new InternalServerError({
			cause: error as Error
		});
	}
}

const auth = {
	getAuthenticatedUser
};

export default auth;
