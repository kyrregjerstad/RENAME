import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.35qKDlVU.js","_app/immutable/chunks/disclose-version.GAsGXIOB.js","_app/immutable/chunks/runtime.cCYf5DrJ.js","_app/immutable/chunks/Icon.4hCV83pT.js","_app/immutable/chunks/index.Nigd1bMf.js","_app/immutable/chunks/main-client.zUYA6cdJ.js"];
export const stylesheets = ["_app/immutable/assets/2.oP6yGNef.css","_app/immutable/assets/Icon.OqITyIig.css"];
export const fonts = [];
