import $ from "jquery";

export class ProjectCard {
	constructor(project) {
		this.project = project;
	}

	render() {
		const href = this.getUrl();
		const $card = $(href ? "<a>" : "<article>", {
			class: "project-card"
		});

		if (href) {
			$card.attr({
				href,
				target: "_blank",
				rel: "noopener noreferrer",
				"aria-label": `${this.project.title} (opens in a new tab)`
			});
		}

		return $card.append(
			this.createImage(),
			this.createDetails(Boolean(href))
		)[0];
	}

	getUrl() {
		try {
			const url = new URL(this.project.href);

			return ["https:", "http:"].includes(url.protocol)
				? url.href
				: null;
		} catch {
			return null;
		}
	}

	createImage() {
		if (!this.project.imageSrc) return null;

		const baseUrl = import.meta.env?.BASE_URL ?? "/";

		return $("<img>", {
			class: "project-card__image",
			src: `${baseUrl}${this.project.imageSrc}`,
			alt: "",
			loading: "lazy"
		}).attr({ width: 640, height: 400 });
	}

	createDetails(linked) {
		const $details = $("<div>", {
			class: "project-card__details"
		}).append(
			$("<h3>", { text: this.project.title }),
			$("<p>", { text: this.project.description })
		);

		if (linked) {
			$details.append($("<span>", {
				class: "project-card__action",
				text: "Visit site ↗"
			}));
		}

		return $details;
	}
}
