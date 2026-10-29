import $ from "jquery";

export class SiteHeader {
	constructor(config) {
		this.config = config;
	}

	render() {
		return $("<header>", { class: "site-header" })
			.append(this.createBrand(), this.createNavigation())[0];
	}

	createBrand() {
		return $("<a>", {
			class: "site-header__brand",
			href: "#top",
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
			$label.attr("href", item.href);
		} else {
			$label.attr("aria-disabled", "true");
		}

		return $("<li>").append($label);
	}
}
