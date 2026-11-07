export class PageRouter {
	constructor({ outlet, routes, dynamicRoutes = [], fallbackPath = "/", onChange = null }) {
		this.outlet = outlet;
		this.routes = new Map(Object.entries(routes));
		this.dynamicRoutes = dynamicRoutes;
		this.fallbackPath = fallbackPath;
		this.onChange = onChange;
		this.started = false;
		this.renderToken = 0;
		this.handleHashChange = async () => {
			await this.renderCurrent();
		};
	}

	async start() {
		if (this.started) return;
		this.started = true;
		window.addEventListener("hashchange", this.handleHashChange);
		await this.renderCurrent();
	}

	stop() {
		if (!this.started) return;
		window.removeEventListener("hashchange", this.handleHashChange);
		this.started = false;
		this.renderToken += 1;
	}

	getPath(hash = window.location.hash) {
		const path = hash.replace(/^#/, "").split("?")[0] || "/";
		const withSlash = path.startsWith("/") ? path : `/${path}`;
		return withSlash.length > 1 ? withSlash.replace(/\/$/, "") : withSlash;
	}

	async renderCurrent() {
		const requestedPath = this.getPath();
		const { path, createPage } = this.resolveRoute(requestedPath);
		const renderToken = ++this.renderToken;

		this.showStatus("Loading page…", "loading");

		try {
			const page = await createPage();
			if (renderToken !== this.renderToken) return;
			this.commitPage(page, path);
		} catch {
			if (renderToken !== this.renderToken) return;
			this.showStatus("This page could not be loaded. Please try again.", "error");
		}
	}

	resolveRoute(path) {
		if (this.routes.has(path)) {
			return { path, createPage: this.routes.get(path) };
		}

		for (const route of this.dynamicRoutes) {
			const params = this.matchPattern(route.pattern, path);
			if (params) {
				return { path, createPage: () => route.create(params) };
			}
		}

		return {
			path: this.fallbackPath,
			createPage: this.routes.get(this.fallbackPath)
		};
	}

	matchPattern(pattern, path) {
		const patternParts = pattern.split("/").filter(Boolean);
		const pathParts = path.split("/").filter(Boolean);
		if (patternParts.length !== pathParts.length) return null;

		const params = {};
		for (let index = 0; index < patternParts.length; index += 1) {
			const patternPart = patternParts[index];
			const pathPart = pathParts[index];
			if (!patternPart.startsWith(":")) {
				if (patternPart !== pathPart) return null;
				continue;
			}

			try {
				params[patternPart.slice(1)] = decodeURIComponent(pathPart);
			} catch {
				return null;
			}
		}

		return params;
	}

	commitPage(page, path) {
		this.outlet.replaceChildren(page);
		this.outlet.dataset.page = path === "/" ? "home" : path.slice(1);
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		this.onChange?.(path, page);
	}

	showStatus(message, type) {
		const status = document.createElement("p");
		status.className = `route-status route-status--${type}`;
		status.setAttribute("role", type === "error" ? "alert" : "status");
		status.textContent = message;
		this.outlet.replaceChildren(status);
		this.outlet.dataset.page = type;
	}
}
