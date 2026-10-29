import { ThemeController } from "./ThemeController.js";
import { AppShell } from "../components/AppShell.js";

export class AppController {
	constructor({ root, config }) {
		if (!root) {
			throw new Error("The #app element was not found.");
		}

		this.root = root;
		this.config = config;
		this.theme = new ThemeController();
		this.shell = new AppShell(config);
	}

	start() {
		this.theme.apply(this.config.defaultTheme);
		document.title = this.config.siteName;
		this.root.replaceChildren(this.shell.render());
	}
}
