import $ from "jquery";
import { SiteHeader } from "./SiteHeader.js";
import { SiteFooter } from "./SiteFooter.js";
import { HomePage } from "../pages/HomePage.js";


export class AppShell {
	constructor(config) {
		this.config = config;
		this.header = new SiteHeader(config);
		this.footer = new SiteFooter(config);
		this.homePage = new HomePage (config);
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
			.append(this.homePage.render());
	}
}
