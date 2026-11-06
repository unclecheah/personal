export const SiteConfig = Object.freeze({
	siteName: "Andrew Cheah",
	defaultTheme: "cosy-dark",
	greeting: "Hi, I'm Andrew.",
	tagline: "Teaching, tinkering, and making things.",
	footerText: "Made with curiosity.",

	blog: {
		previewCount: 2
	},

	projects: [
		{
			title: "CD Choir",
			description: "Music, scores, and a shared space for the choir.",
			imageSrc: "images/project-choir.png",
			href: "https://choir.unclecheah.com/"
		},
		{
			title: "Photo gallery",
			description: "A collection of places, moments, and everyday discoveries.",
			imageSrc: "images/project-photos.png",
			href: "https://photos.unclecheah.com/"
		}
	],

	hero: {
		eyebrow: "Welcome to my corner",
		imageSrc: "images/hero-desk.png",
		interests: [
			{ label: "Teaching", icon: "book" },
			{ label: "Code", icon: "code-slash" },
			{ label: "Music", icon: "music-note-beamed" },
			{ label: "Photography", icon: "camera" }
		],
		actions: [
			{ label: "A little about me", href: null },
			{ label: "Read the blog", href: null }
		]
	},

	navigation: [
		{ label: "About", href: null },
		{ label: "CV", href: null },
		{ label: "Blog", href: null },
		{ label: "Projects", href: null }
	]
});
