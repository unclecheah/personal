import $ from "jquery";
import { HomeHero } from "../components/HomeHero.js";
import { BlogPreviewList } from "../components/BlogPreviewList.js";
import { ProjectLinks } from "../components/ProjectLinks.js";

export class HomePage {
	constructor(config, posts = []) {
		this.hero = new HomeHero(config);
		this.blog = new BlogPreviewList(posts, config.blog.previewCount);
		this.projects = new ProjectLinks(config.projects);
	}

	render() {
		return $("<div>", { class: "home-page" }).append(
			this.hero.render(),
			this.createSections()
		)[0];
	}

	createSections() {
		return $("<div>", { class: "home-page__sections" })
			.append(this.blog.render(), this.projects.render());
	}
}
