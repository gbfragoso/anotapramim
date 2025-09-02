export class InternalServerError extends Error {
	statusCode: number;
	action: string;

	constructor(error: Error, statusCode?: number) {
		super('Um erro interno não esperado aconteceu.', {
			cause: error
		});
		this.name = 'InternalServerError';
		this.action = 'Entre em contato com o suporte';
		this.statusCode = statusCode || 500;
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			action: this.action,
			status_code: this.statusCode
		};
	}
}

export class ServiceError extends Error {
	statusCode: number;
	action: string;

	constructor(message: string, cause?: string) {
		super(message || 'Serviço indisponível no momento.', {
			cause: cause ? new Error(cause) : undefined
		});
		this.name = 'ServiceError';
		this.action = 'Verifique se o serviço está disponível.';
		this.statusCode = 503;
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			action: this.action,
			status_code: this.statusCode
		};
	}
}

export class ValidationError extends Error {
	statusCode: number;
	action: string;

	constructor(message: string, action?: string, cause?: string) {
		super(message || 'Um erro de validação ocorreu.', {
			cause: cause ? new Error(cause) : undefined
		});
		this.name = 'ValidationError';
		this.action = action || 'Verifique os dados enviados e tente novamente.';
		this.statusCode = 400;
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			action: this.action,
			status_code: this.statusCode
		};
	}
}

export class NotFoundError extends Error {
	statusCode: number;
	action: string;

	constructor(message: string, action?: string, cause?: string) {
		super(message || 'Não foi possível encontrar este recurso no sistema.', {
			cause: cause ? new Error(cause) : undefined
		});
		this.name = 'NotFoundError';
		this.action = action || 'Verifique se os parâmetros enviados na consulta estão certos.';
		this.statusCode = 404;
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			action: this.action,
			status_code: this.statusCode
		};
	}
}
