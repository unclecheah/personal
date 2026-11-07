export const SiteConfig = Object.freeze({
	siteName: "Andrew Cheah",
	defaultTheme: "cosy-dark",
	greeting: "Hi, I'm Andrew.",
	tagline: "Teaching, tinkering, and making things.",
	footerText: "Made with curiosity.",

	blog: {
		previewCount: 2,
		eyebrow: "From the blog",
		title: "Notes from things I'm learning and making.",
		intro: "For now, these are sample entries that show how the blog will feel. Real articles and individual post pages will come next."
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

	about: {
		eyebrow: "A little about me",
		title: "I like making difficult things feel approachable.",
		intro: "I'm Andrew — a lecturer, tinkerer, choir member, and photographer. This site is where those interests get to live together.",
		cards: [
			{
				icon: "easel2",
				title: "Teaching",
				description: "I enjoy turning technical ideas into lessons that feel concrete, visual, and possible to learn."
			},
			{
				icon: "braces",
				title: "Making",
				description: "Most of my side projects begin with a small irritation, a curious question, or the thought: I wonder if I can build that."
			},
			{
				icon: "music-note-list",
				title: "Away from the desk",
				description: "Choir music and photography give me slower ways to notice details, places, and people."
			}
		]
	},

	cv: {
		eyebrow: "CV",
		title: "The short version.",
		intro: "A friendly overview for now. Detailed dates, qualifications, and a downloadable CV can be added once the final content is ready.",
		sections: [
			{
				title: "Current work",
				subtitle: "Polytechnic lecturer",
				description: "Teaching technical subjects, mentoring students, and helping project teams turn requirements into workable solutions.",
				points: ["Teaching and learning support", "Final-year and internship mentoring", "Industry project collaboration"]
			},
			{
				title: "Topics I return to",
				subtitle: "Technology, mathematics, and explanation",
				description: "I am especially interested in the places where mathematical ideas become useful tools.",
				points: ["Computer graphics and modelling", "Programming physics", "Cryptography and applied mathematics"]
			},
			{
				title: "Personal projects",
				subtitle: "Small tools and useful experiments",
				description: "Web projects for choir music and photography, along with experiments in graphics, document tools, and teaching resources.",
				points: []
			}
		]
	},

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
			{ label: "A little about me", href: "#/about" },
			{ label: "Read the blog", href: "#/blog" }
		]
	},

	navigation: [
		{ label: "About", href: "#/about", route: "/about" },
		{ label: "CV", href: "#/cv", route: "/cv" },
		{ label: "Blog", href: "#/blog", route: "/blog" },
		{ label: "Projects", href: null }
	]
});
