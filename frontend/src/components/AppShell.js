import $ from "jquery";
import { SiteHeader } from "./SiteHeader.js";
import { SiteFooter } from "./SiteFooter.js";

export class AppShell {
	constructor(config) {
		this.config = config;
		this.header = new SiteHeader(config);
		this.footer = new SiteFooter(config);
	}

	render() {
		return $("<div>", { id: "top", class: "site-shell" }).append(
			this.createSkipLink(),
			this.header.render(),
			this.createMain(),
			this.footer.render()
		)[0];
	}

	createSkipLink() {
		return $("<a>", {
			class: "skip-link",
			href: "#main-content",
			text: "Skip to content"
		});
	}

	createMain() {
		return $("<main>", { id: "main-content", tabindex: -1 })
			.append(this.createIntro());
	}

	createIntro() {
		const $intro = $(`
			<section class="site-intro" aria-labelledby="intro-title">
				<p class="site-intro__eyebrow">Welcome to my corner</p>
				<h1 id="intro-title" class="site-intro__title"></h1>
				<p class="site-intro__tagline"></p>
			</section>
		`);

		$intro.find(".site-intro__title").text(this.config.greeting);
		$intro.find(".site-intro__tagline").text(this.config.tagline);

		return $intro;
	}
}
