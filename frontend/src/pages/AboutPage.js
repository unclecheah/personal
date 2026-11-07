import $ from "jquery";
import { PageIntro } from "../components/PageIntro.js";
import { InfoCard } from "../components/InfoCard.js";

export class AboutPage {
	constructor(config) {
		this.config = config;
	}

	render() {
		return $("<section>", { class: "content-page", "aria-labelledby": "about-title" }).append(
			this.createIntro(),
			this.createCards()
		)[0];
	}

	createIntro() {
		const intro = new PageIntro(this.config).render();
		intro.querySelector("h1").id = "about-title";
		return intro;
	}

	createCards() {
		const $grid = $("<div>", { class: "content-page__grid" });
		for (const card of this.config.cards) {
			$grid.append(new InfoCard(card).render());
		}
		return $grid;
	}
}
