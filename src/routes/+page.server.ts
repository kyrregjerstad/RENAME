import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const firstName = cookies.get('firstName') || null;
	const lastName = cookies.get('lastName') || null;

	return {
		firstName,
		lastName,
	};
};

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		if (theme) {
			cookies.set('colortheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365, // 1 year
			});
		}
	},
};
