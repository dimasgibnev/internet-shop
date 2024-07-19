import {  getPost } from '../api';
import { getPostCommentsWithAuthor } from '../utils/get-comments-with-author';

export const fetchPost = async (postId) => {
	let post;
	let error;

	try {
		post = await getPost(postId);
	} catch (postError) {
		error = postError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}
	const comments = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	};
};
