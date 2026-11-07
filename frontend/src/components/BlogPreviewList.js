import $ from "jquery";
import { BlogPostCard } from "./BlogPostCard.js";

export class BlogPreviewList {
	constructor(posts = [], limit = 2) {
		this.posts = posts.slice(0, limit);
	}

	render() {
		const $section = $("<section>", { class: "home-section", "aria-label": "From the blog" });
		$section.append($("<h2>", { class: "home-section__title", text: "From the blog" }));
		$section.append(this.createList());
		return $section[0];
	}

	createList() {
		if (!this.posts.length) {
			return $("<p>", { class: "home-section__empty", text: "No posts yet." });
		}
		const $list = $("<div>", { class: "blog-preview-list" });
		for (const post of this.posts) {
			$list.append(this.createPreview(post));
		}
		return $list;
	}

	createPreview(post) {
		return new BlogPostCard(post, { compact: true }).render();
	}
}
