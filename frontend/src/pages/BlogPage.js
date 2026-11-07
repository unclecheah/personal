import $ from "jquery";
import { PageIntro } from "../components/PageIntro.js";
import { BlogPostCard } from "../components/BlogPostCard.js";

export class BlogPage {
	constructor(config, blogService) {
		this.config = config;
		this.blogService = blogService;
	}

	async render() {
		const posts = await this.blogService.getPosts();
		return $("<section>", { class: "content-page blog-page", "aria-labelledby": "blog-title" })
			.append(this.createIntro(), this.createPostList(posts))[0];
	}

	createIntro() {
		const intro = new PageIntro(this.config).render();
		intro.querySelector("h1").id = "blog-title";
		return intro;
	}

	createPostList(posts) {
		if (!posts.length) {
			return $("<p>", { class: "blog-page__empty", text: "No posts yet." });
		}

		const $list = $("<div>", { class: "blog-post-grid" });
		for (const post of posts) {
			$list.append(new BlogPostCard(post).render());
		}
		return $list;
	}
}
