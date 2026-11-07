import { ThemeController } from "./ThemeController.js";
import { PageRouter } from "./PageRouter.js";
import { AppShell } from "../components/AppShell.js";
import { HomePage } from "../pages/HomePage.js";
import { AboutPage } from "../pages/AboutPage.js";
import { CvPage } from "../pages/CvPage.js";
import { BlogPage } from "../pages/BlogPage.js";
import { ArticlePage } from "../pages/ArticlePage.js";
import { BlogService } from "../services/BlogService.js";
import { SamplePosts } from "../data/SamplePosts.js";

export class AppController {
	constructor({ root, config, blogService = null }) {
		if (!root) {
			throw new Error("The #app element was not found.");
		}

		this.root = root;
		this.config = config;
		this.theme = new ThemeController();
		this.shell = new AppShell(config);
		this.blogService = blogService ?? new BlogService(SamplePosts);
		this.router = null;
	}

	async start() {
		this.theme.apply(this.config.defaultTheme);
		this.router?.stop();
		this.root.replaceChildren(this.shell.render());
		this.router = this.createRouter();
		await this.router.start();
	}

	createRouter() {
		return new PageRouter({
			outlet: this.shell.getOutlet(),
			routes: {
				"/": async () => {
					const posts = await this.blogService.getPosts();
					return new HomePage(this.config, posts).render();
				},
				"/about": () => new AboutPage(this.config.about).render(),
				"/cv": () => new CvPage(this.config.cv).render(),
				"/blog": async () => new BlogPage(this.config.blog, this.blogService).render()
			},
			dynamicRoutes: [
				{
					pattern: "/blog/:slug",
					create: async ({ slug }) => {
						const post = await this.blogService.getPost(slug);
						return new ArticlePage(post).render();
					}
				}
			],
			onChange: (path, page) => this.handleRouteChange(path, page)
		});
	}

	handleRouteChange(path, page) {
		const navigationPath = path.startsWith("/blog/") ? "/blog" : path;
		this.shell.header.setActive(navigationPath);
		const item = this.config.navigation.find(entry => entry.route === navigationPath);
		const pageTitle = page.dataset.pageTitle || item?.label;
		document.title = pageTitle
			? `${pageTitle} · ${this.config.siteName}`
			: this.config.siteName;
	}
}
