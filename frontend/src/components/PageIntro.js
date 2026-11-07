import $ from "jquery";

export class PageIntro {
	constructor({ eyebrow, title, intro }) {
		this.eyebrow = eyebrow;
		this.title = title;
		this.intro = intro;
	}

	render() {
		return $("<header>", { class: "page-intro" }).append(
			$("<p>", { class: "page-intro__eyebrow", text: this.eyebrow }),
			$("<h1>", { text: this.title }),
			$("<p>", { class: "page-intro__lead", text: this.intro })
		)[0];
	}
}
