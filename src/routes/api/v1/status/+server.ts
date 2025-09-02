import { db } from '$lib/database/connection';
import { InternalServerError, ValidationError } from '$lib/infra/errors';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const maxConnections = await db.execute(`SHOW max_connections`);
		const version = await db.execute('SHOW server_version');
		const openedConnections = await db.execute(
			'SELECT COUNT(*) FROM pg_stat_activity WHERE datname = current_database()'
		);

		const result = {
			updated_at: new Date().toISOString(),
			dependencies: {
				database: {
					max_connections: parseInt(maxConnections[0].max_connections as string, 10),
					opened_connections: parseInt(openedConnections[0].count as string, 10),
					version: version[0].server_version
				}
			}
		};
		return json(result, { status: 200 });
	} catch (error) {
		console.log(error);
		if (error instanceof ValidationError) {
			return json(error, { status: error.statusCode });
		}
		return json(new InternalServerError(error as Error));
	}
};
