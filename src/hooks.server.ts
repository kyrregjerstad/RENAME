import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const theme = event.url.searchParams.get('theme') || event.cookies.get('colortheme') || 'dark';

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace(`data-theme=""`, `data-theme="${theme}"`),
	});
}) satisfies Handle;
