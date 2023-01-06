export default {
	LANDING: { path: '/', isPublic: true },
	LOGIN: { path: '/login', isPublic: true },
	HOME: {
		path: '/app/home',
	},

	isPublicRoute(route) {
		return this.getPublicRoutes().includes(route);
	},
	getPublicRoutes() {
		return Object.values(this)
			.filter((it) => it.path && it.isPublic)
			.map((it) => it.path);
	},
};
