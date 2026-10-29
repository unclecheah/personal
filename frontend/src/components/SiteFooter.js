import $ from "jquery";

export class SiteFooter {
	constructor(config) {
		this.config = config;
	}

	render() {
		return $("<footer>", { class: "site-footer" })
			.append(this.createSignature(), this.createCopyright())[0];
	}

	createSignature() {
		return $("<p>", {
			class: "site-footer__signature",
			text: this.config.footerText
		});
	}

	createCopyright() {
		return $("<small>", {
			text: `© ${new Date().getFullYear()} ${this.config.siteName}`
		});
	}
}
