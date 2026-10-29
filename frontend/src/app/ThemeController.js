const supportedThemes = Object.freeze(["cosy-dark", "cosy-light"]);

export class ThemeController {
	constructor(root = document.documentElement) {
		this.root = root;
	}

	apply(theme) {
		if (!supportedThemes.includes(theme)) {
			throw new Error(`Unknown theme: ${theme}`);
		}

		this.root.setAttribute("data-theme", theme);
	}
}
