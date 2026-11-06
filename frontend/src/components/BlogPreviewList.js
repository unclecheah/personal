import $ from "jquery";

export class BlogPreviewList {
	constructor(posts = [], limit = 2) {
		this.posts = posts.slice(0, limit);
	}

	render() {
		const $section = $("<section>", {
			class: "home-section",
			"aria-label": "From the blog"
		});

		$section.append($("<h2>", {
			class: "home-section__title",
			text: "From the blog"
		}));

		$section.append(this.createList());
		return $section[0];
	}

	createList() {
		if (!this.posts.length) {
			return $("<p>", {
				class: "home-section__empty",
				text: "No posts yet."
			});
		}

		const $list = $("<div>", { class: "blog-preview-list" });

		for (const post of this.posts) {
			$list.append(this.createPreview(post));
		}

		return $list;
	}

	createPreview(post) {
		return $("<article>", { class: "blog-preview" }).append(
			this.createThumbnail(post),
			this.createDetails(post)
		);
	}

	createThumbnail(post) {
		const $media = $("<div>", {
			class: "blog-preview__media",
			"aria-hidden": "true"
		});

		if (post.imageSrc) {
			const baseUrl = import.meta.env?.BASE_URL ?? "/";

			return $media.append($("<img>", {
				src: `${baseUrl}${post.imageSrc}`,
				alt: "",
				loading: "lazy"
			}).attr({ width: 160, height: 120 }));
		}

		return $media.append($("<i>", {
			class: `bi bi-${post.icon || "journal-text"}`
		}));
	}

	createDetails(post) {
		const label = post.isSample
			? `${post.category} · Sample post`
			: post.category;

		return $("<div>", { class: "blog-preview__details" }).append(
			$("<p>", {
				class: "blog-preview__category",
				text: label
			}),
			$("<h3>", { text: post.title }),
			$("<p>", {
				class: "blog-preview__excerpt",
				text: post.excerpt
			})
		);
	}
}
