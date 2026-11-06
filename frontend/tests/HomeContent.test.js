import test, { after } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { SiteConfig } from "../src/config/SiteConfig.js";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
globalThis.window = dom.window;
globalThis.document = dom.window.document;

const { BlogPreviewList } = await import("../src/components/BlogPreviewList.js");
const { ProjectCard } = await import("../src/components/ProjectCard.js");
const { ProjectLinks } = await import("../src/components/ProjectLinks.js");
const { HomePage } = await import("../src/pages/HomePage.js");
after(() => dom.window.close());

test("blog previews preserve order and leave the input list unchanged", () => {
	const posts = ["First", "Second", "Third"].map(title => ({
		title, excerpt: "A short note.", category: "Notes"
	}));
	const section = new BlogPreviewList(posts, 2).render();
	assert.deepEqual([...section.querySelectorAll("h3")].map(el => el.textContent),
		["First", "Second"]);
	assert.equal(posts.length, 3);
});

test("sample content is labelled, non-clickable, and rendered as text", () => {
	const section = new BlogPreviewList([{
		title: "<b>A title</b>", excerpt: "<img src=x>", category: "Notes", isSample: true
	}]).render();
	assert.match(section.textContent, /Notes · Sample post/);
	assert.equal(section.querySelector("h3").textContent, "<b>A title</b>");
	assert.equal(section.querySelectorAll("a, b, img").length, 0);
	assert.ok(section.querySelector(".bi-journal-text"));
});

test("empty sections show useful messages", () => {
	assert.match(new BlogPreviewList([]).render().textContent, /No posts yet/);
	assert.match(new ProjectLinks([]).render().textContent, /More projects to come/);
});

test("external project links announce a new tab and protect the opener", () => {
	const card = new ProjectCard({
		title: "Photos", description: "My gallery", href: "https://example.com/",
		imageSrc: "images/project-photos.png"
	}).render();
	assert.equal(card.tagName, "A");
	assert.equal(card.getAttribute("href"), "https://example.com/");
	assert.equal(card.getAttribute("target"), "_blank");
	assert.equal(card.getAttribute("rel"), "noopener noreferrer");
	assert.match(card.getAttribute("aria-label"), /opens in a new tab/);
	assert.equal(card.querySelector("img").getAttribute("src"), "/images/project-photos.png");
	assert.equal(card.querySelector("img").getAttribute("alt"), "");
});

test("missing or unsupported project URLs produce plain cards", () => {
	for (const href of [null, "", "javascript:alert(1)", "ftp://example.com/"]) {
		const card = new ProjectCard({
			title: "<b>Choir</b>", description: "Music", href
		}).render();
		assert.equal(card.tagName, "ARTICLE");
		assert.equal(card.querySelectorAll("a, img, b, .project-card__action").length, 0);
		assert.equal(card.querySelector("h3").textContent, "<b>Choir</b>");
	}
});

test("the homepage composes the hero, supplied posts, and configured projects", () => {
	const page = new HomePage(SiteConfig, []).render();
	assert.equal(page.querySelectorAll("h1").length, 1);
	assert.equal(page.querySelectorAll(".home-section").length, 2);
	assert.equal(page.querySelectorAll(".project-card").length, SiteConfig.projects.length);
	assert.match(page.textContent, /No posts yet/);
});
