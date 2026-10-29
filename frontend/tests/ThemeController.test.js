import test from "node:test";
import assert from "node:assert/strict";
import { ThemeController } from "../src/app/ThemeController.js";
import { SiteConfig } from "../src/config/SiteConfig.js";

function createRoot() {
	return {
		attributes: {},
		setAttribute(name, value) {
			this.attributes[name] = value;
		}
	};
}

test("the configured default theme can be applied", () => {
	const root = createRoot();
	new ThemeController(root).apply(SiteConfig.defaultTheme);
	assert.equal(root.attributes["data-theme"], SiteConfig.defaultTheme);
});

test("a theme change replaces the previous theme", () => {
	const root = createRoot();
	const theme = new ThemeController(root);
	theme.apply("cosy-dark");
	theme.apply("cosy-light");
	assert.equal(root.attributes["data-theme"], "cosy-light");
});

test("an unsupported theme leaves the current theme unchanged", () => {
	const root = createRoot();
	const theme = new ThemeController(root);
	theme.apply("cosy-dark");
	assert.throws(() => theme.apply("unknown"), /Unknown theme/);
	assert.equal(root.attributes["data-theme"], "cosy-dark");
});
