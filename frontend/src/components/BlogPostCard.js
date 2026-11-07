import $ from "jquery";

export class BlogPostCard {
	constructor(post, { compact = false } = {}) {
		this.post = post;
		this.compact = compact;
	}

	render() {
		return $("<article>", { class: this.getClassName() }).append(
			this.createMedia(),
			this.createDetails()
		)[0];
	}

	getClassName(element = "") {
		const block = this.compact ? "blog-preview" : "blog-post-card";
		return element ? `${block}__${element}` : block;
	}

	createMedia() {
		const $media = $("<div>", {
			class: this.getClassName("media"),
			"aria-hidden": "true"
		});

		if (this.post.imageSrc) {
			const baseUrl = import.meta.env?.BASE_URL ?? "/";
			return $media.append($("<img>", {
				src: `${baseUrl}${this.post.imageSrc}`,
				alt: "",
				loading: "lazy"
			}).attr({ width: this.compact ? 160 : 640, height: this.compact ? 120 : 360 }));
		}

		return $media.append($("<i>", {
			class: `bi bi-${this.post.icon || "journal-text"}`
		}));
	}

	createDetails() {
		const $details = $("<div>", { class: this.getClassName("details") }).append(
			$("<p>", { class: this.getClassName("category"), text: this.createLabel() }),
			this.createTitle(),
			$("<p>", { class: this.getClassName("excerpt"), text: this.post.excerpt })
		);

		if (!this.compact && this.post.tags?.length) {
			$details.append(this.createTags());
		}

		return $details;
	}

	createTitle() {
		const $title = $("<h3>");
		if (!this.post.slug) {
			return $title.text(this.post.title);
		}

		return $title.append($("<a>", {
			href: `#/blog/${encodeURIComponent(this.post.slug)}`,
			text: this.post.title
		}));
	}

	createLabel() {
		return this.post.isSample
			? `${this.post.category} · Sample post`
			: this.post.category;
	}

	createTags() {
		const $tags = $("<ul>", { class: "blog-post-card__tags", "aria-label": "Topics" });
		for (const tag of this.post.tags) {
			$tags.append($("<li>", { text: tag }));
		}
		return $tags;
	}
}
