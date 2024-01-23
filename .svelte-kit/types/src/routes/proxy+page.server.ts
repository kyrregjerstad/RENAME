// @ts-nocheck
import type { Actions } from '@sveltejs/kit';

export const actions = {
	setTheme: async ({ url, cookies }: import('./$types').RequestEvent) => {
		const theme = url.searchParams.get('theme');
		if (theme) {
			cookies.set('colortheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365 // 1 year
			});
		}
	}
};
;null as any as Actions;