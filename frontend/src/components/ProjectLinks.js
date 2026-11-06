import $ from "jquery";
import { ProjectCard } from "./ProjectCard.js";

export class ProjectLinks {
	constructor(projects = []) {
		this.projects = projects;
	}

	render() {
		return $("<section>", {
			class: "home-section",
			"aria-label": "My little corner of the web"
		}).append(
			$("<h2>", {
				class: "home-section__title",
				text: "My little corner of the web"
			}),
			this.createCards()
		)[0];
	}

	createCards() {
		if (!this.projects.length) {
			return $("<p>", {
				class: "home-section__empty",
				text: "More projects to come."
			});
		}

		const $cards = $("<div>", { class: "project-links" });

		for (const project of this.projects) {
			$cards.append(new ProjectCard(project).render());
		}

		return $cards;
	}
}
