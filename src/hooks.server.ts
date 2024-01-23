import type { Theme } from '$lib/types';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	let theme: Theme | null = null;

	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('colortheme');

	if (newTheme) {
		theme = newTheme as Theme;
	} else if (cookieTheme) {
		theme = cookieTheme as Theme;
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace(`data-theme=""`, `data-theme="${theme}"`)
		});
	}

	return await resolve(event);
}) satisfies Handle;
