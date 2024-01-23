export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["RENAME.svg","favicon.png","favicon05x.png","favicon1x.png","github-logo.svg","icon-copy-string.svg","icon1024.png","icon192.png","icon256.png","icon512.png","icon512.svg","logo.png","logo.svg","logo1x.png","logo2x.png","n.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.xsViKcYQ.js","app":"_app/immutable/entry/app.ukwZCjCY.js","imports":["_app/immutable/entry/start.xsViKcYQ.js","_app/immutable/chunks/entry.AbsKzYBV.js","_app/immutable/chunks/runtime.cCYf5DrJ.js","_app/immutable/chunks/index.Nigd1bMf.js","_app/immutable/entry/app.ukwZCjCY.js","_app/immutable/chunks/runtime.cCYf5DrJ.js","_app/immutable/chunks/disclose-version.GAsGXIOB.js","_app/immutable/chunks/main-client.zUYA6cdJ.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
