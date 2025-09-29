import { error, fail } from '@sveltejs/kit';
import setCookieParser from 'set-cookie-parser';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const form = await request.formData();
		const username = form.get('username') as string;
		const password = form.get('password') as string;

		try {
			const response = await fetch('http://localhost:5173/api/v1/sessions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: username,
					password
				})
			});

			if (response.status !== 200) {
				const responseBody = await response.json();
				return fail(response.status, responseBody);
			}

			const combinedCookieHeader = response.headers.get('Set-Cookie') as string;
			if (combinedCookieHeader) {
				const splitCookieHeaders = setCookieParser.splitCookiesString(combinedCookieHeader);
				const parsedSetCookie = setCookieParser.parse(splitCookieHeaders, {
					map: true
				});
				cookies.set('session_id', parsedSetCookie.session_id.value, {
					path: '/',
					maxAge: parsedSetCookie.session_id.maxAge
				});
			}
		} catch (err) {
			console.error(err);
			return error(500, {
				message: 'Falha ao realizar o login'
			});
		}
	}
} satisfies Actions;
