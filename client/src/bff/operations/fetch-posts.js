import { getPosts, getComments } from '../api';
import { getCommentsCount } from '../utils';

export const fetchPosts = async (searchPhrase, page, limit) => {
	const data = await Promise.all([getPosts(page, limit, searchPhrase), getComments()]);

	const [{ posts, lastPage }, comments] = data;

	const postsWithComments = posts
		? posts.map((post) => ({
				...post,
				commentsCount: getCommentsCount(comments, post.id),
			}))
		: [];

	return {
		error: null,
		res: {
			posts: postsWithComments,
			lastPage,
		},
	};
};
