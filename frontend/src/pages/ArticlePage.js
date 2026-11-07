import $ from "jquery";

export class ArticlePage {
	constructor(post) {
		this.post = post;
	}

	render() {
		if (!this.post) return this.createNotFound();

		return $("<article>", {
			class: "article-page",
			"aria-labelledby": "article-title",
			"data-page-title": this.post.title
		}).append(
			this.createBackLink(),
			this.createHeader(),
			this.createMedia(),
			this.createBody(),
			this.createBackLink("Back to all notes")
		)[0];
	}

	createHeader() {
		return $("<header>", { class: "article-page__header" }).append(
			$("<p>", { class: "article-page__category", text: this.createLabel() }),
			$("<h1>", { id: "article-title", text: this.post.title }),
			$("<p>", { class: "article-page__excerpt", text: this.post.excerpt }),
			this.createTags()
		);
	}

	createLabel() {
		return this.post.isSample
			? `${this.post.category} · Sample article`
			: this.post.category;
	}

	createTags() {
		if (!this.post.tags?.length) return null;
		const $tags = $("<ul>", { class: "article-page__tags", "aria-label": "Topics" });
		for (const tag of this.post.tags) {
			$tags.append($("<li>", { text: tag }));
		}
		return $tags;
	}

	createMedia() {
		const $media = $("<div>", { class: "article-page__media", "aria-hidden": "true" });
		if (this.post.imageSrc) {
			const baseUrl = import.meta.env?.BASE_URL ?? "/";
			return $media.append($("<img>", {
				src: `${baseUrl}${this.post.imageSrc}`,
				alt: ""
			}).attr({ width: 960, height: 540 }));
		}

		return $media.append($("<i>", {
			class: `bi bi-${this.post.icon || "journal-text"}`
		}));
	}

	createBody() {
		const $body = $("<div>", { class: "article-page__body" });
		for (const paragraph of this.post.content ?? []) {
			$body.append($("<p>", { text: paragraph }));
		}
		return $body;
	}

	createBackLink(label = "All notes") {
		return $("<a>", {
			class: "article-page__back",
			href: "#/blog",
			text: `← ${label}`
		});
	}

	createNotFound() {
		return $("<section>", {
			class: "content-page article-not-found",
			"aria-labelledby": "article-not-found-title",
			"data-page-title": "Article not found"
		}).append(
			$("<p>", { class: "page-intro__eyebrow", text: "From the blog" }),
			$("<h1>", { id: "article-not-found-title", text: "That note isn't here." }),
			$("<p>", { text: "It may have moved, or the address may be incomplete." }),
			this.createBackLink()
		)[0];
	}
}
