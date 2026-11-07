import $ from "jquery";

export class InfoCard {
	constructor(item, className = "") {
		this.item = item;
		this.className = className;
	}

	render() {
		const $card = $("<article>", {
			class: `info-card ${this.className}`.trim()
		}).append(this.createHeading(), this.createDescription());

		if (this.item.points?.length) $card.append(this.createList());
		return $card[0];
	}

	createHeading() {
		const $heading = $("<div>", { class: "info-card__heading" });
		if (this.item.icon) {
			$heading.append($("<i>", {
				class: `bi bi-${this.item.icon}`,
				"aria-hidden": "true"
			}));
		}

		return $heading.append($("<div>").append(
			$("<h2>", { text: this.item.title }),
			this.item.subtitle
				? $("<p>", { class: "info-card__subtitle", text: this.item.subtitle })
				: null
		));
	}

	createDescription() {
		return $("<p>", { class: "info-card__description", text: this.item.description });
	}

	createList() {
		const $list = $("<ul>", { class: "info-card__list" });
		for (const point of this.item.points) $list.append($("<li>", { text: point }));
		return $list;
	}
}
