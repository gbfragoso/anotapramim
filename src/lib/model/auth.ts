import { UnauthorizedError } from '$lib/infra/errors';
import password from '$lib/model/password';
import user from '$lib/model/user';

async function getAuthenticatedUser(email: string, password: string) {
	try {
		const storedUser = await user.findOneByEmail(email);
		await validatePassword(password, storedUser.password);
		return storedUser;
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			throw new UnauthorizedError({
				message: 'Dados de autenticação não conferem.',
				action: 'Verifique se os dados enviados estão corretos.'
			});
		}
		throw error;
	}
}

async function validatePassword(providedPassword: string, storedHashedPassword: string) {
	const isPasswordValid = await password.verify(providedPassword, storedHashedPassword);
	if (!isPasswordValid) {
		throw new UnauthorizedError({
			message: 'Senha inválida',
			action: 'Verifique se a senha esta correta.'
		});
	}
}

const auth = {
	getAuthenticatedUser
};

export default auth;
