import $ from "jquery";

export class HomeHero {
	constructor(config) {
		this.config = config;
	}

	render() {
		return $("<section>", {
			class: "home-hero",
			"aria-labelledby": "hero-title"
		}).append(this.createContent(), this.createArtwork())[0];
	}

	createContent() {
		return $("<div>", { class: "home-hero__content" }).append(
			this.createHeading(),
			this.createInterests(),
			this.createActions()
		);
	}

	createHeading() {
		const $heading = $(`
			<div>
				<p class="home-hero__eyebrow"></p>
				<h1 id="hero-title" class="home-hero__title"></h1>
				<p class="home-hero__tagline"></p>
			</div>
		`);

		$heading.find(".home-hero__eyebrow").text(this.config.hero.eyebrow);
		$heading.find("h1").text(this.config.greeting);
		$heading.find(".home-hero__tagline").text(this.config.tagline);

		return $heading;
	}

	createInterests() {
		const $list = $("<ul>", { class: "home-hero__interests" });

		for (const interest of this.config.hero.interests) {
			$list.append($("<li>").append(
				$("<i>", {
					class: `bi bi-${interest.icon}`,
					"aria-hidden": "true"
				}),
				$("<span>", { text: interest.label })
			));
		}

		return $list;
	}

	createActions() {
		const $actions = $("<div>", { class: "home-hero__actions" });

		this.config.hero.actions.forEach((action, index) => {
			$actions.append(this.createAction(action, index === 0));
		});

		return $actions;
	}

	createAction(action, primary) {
		const $action = $(action.href ? "<a>" : "<button>", {
			class: "home-hero__action",
			text: action.label
		}).toggleClass("home-hero__action--primary", primary);

		if (action.href) {
			$action.attr("href", action.href);
		} else {
			$action.attr({ type: "button", disabled: true });
		}

		return $action;
	}

	createArtwork() {
		const baseUrl = import.meta.env?.BASE_URL ?? "/";
		const $image = $("<img>", {
			src: `${baseUrl}${this.config.hero.imageSrc}`,
			alt: "",
			fetchpriority: "high"
		}).attr({ width: 1448, height: 1086 });

		return $("<div>", { class: "home-hero__artwork" }).append($image);
	}
}
