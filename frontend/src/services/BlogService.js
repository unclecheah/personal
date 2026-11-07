export class BlogService {
	constructor(posts = []) {
		this.posts = posts.map(post => this.copyPost(post));
	}

	async getPosts() {
		return this.posts.map(post => this.copyPost(post));
	}

	async getPost(slug) {
		const post = this.posts.find(item => item.slug === slug);
		return post ? this.copyPost(post) : null;
	}

	copyPost(post) {
		return {
			...post,
			tags: [...(post.tags ?? [])],
			content: [...(post.content ?? [])]
		};
	}
}
