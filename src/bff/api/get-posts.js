import { transformPost } from '../transformers';

export const getPosts = (page, limit, searchPhrase) =>
	fetch(
		`http://localhost:3005/posts?title=${searchPhrase}&_page=${page}&_per_page=${limit}`,
	)
		.then((loadedPosts) => loadedPosts.json())
		.then((loadedPosts) => {

			return {
				posts: loadedPosts && loadedPosts.data.map(transformPost),
				lastPage: loadedPosts.last,
			}
		});
