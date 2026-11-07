import $ from "jquery";

export class SiteHeader {
	constructor(config) {
		this.config = config;
		this.element = null;
	}

	render() {
		this.element = $("<header>", { class: "site-header" })
			.append(this.createBrand(), this.createNavigation())[0];
		return this.element;
	}

	createBrand() {
		return $("<a>", {
			class: "site-header__brand",
			href: "#/",
			"data-route": "/",
			text: this.config.siteName
		});
	}

	createNavigation() {
		const $list = $("<ul>", { class: "site-header__links" });

		for (const item of this.config.navigation) {
			$list.append(this.createNavItem(item));
		}

		return $("<nav>", { "aria-label": "Main navigation" })
			.append($list);
	}

	createNavItem(item) {
		const $label = $(item.href ? "<a>" : "<span>", {
			class: "site-header__link",
			text: item.label
		});

		if (item.href) {
			$label.attr({ href: item.href, "data-route": item.route });
		} else {
			$label.attr("aria-disabled", "true");
		}

		return $("<li>").append($label);
	}

	setActive(path) {
		if (!this.element) return;
		for (const link of this.element.querySelectorAll("[data-route]")) {
			if (link.dataset.route === path) {
				link.setAttribute("aria-current", "page");
			} else {
				link.removeAttribute("aria-current");
			}
		}
	}
}
