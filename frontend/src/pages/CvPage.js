import $ from "jquery";
import { PageIntro } from "../components/PageIntro.js";
import { InfoCard } from "../components/InfoCard.js";

export class CvPage {
	constructor(config) {
		this.config = config;
	}

	render() {
		return $("<section>", { class: "content-page", "aria-labelledby": "cv-title" }).append(
			this.createIntro(),
			this.createSections()
		)[0];
	}

	createIntro() {
		const intro = new PageIntro(this.config).render();
		intro.querySelector("h1").id = "cv-title";
		return intro;
	}

	createSections() {
		const $list = $("<div>", { class: "content-page__list" });
		for (const section of this.config.sections) {
			$list.append(new InfoCard(section, "info-card--wide").render());
		}
		return $list;
	}
}
