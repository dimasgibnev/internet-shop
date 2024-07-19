import { addComment, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils/get-comments-with-author';

export const addPostComment = async (hash, postId, userId, content, login) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен!',
			res: null,
		};
	}

	await addComment(postId, userId, content, login);

	const post = await getPost(postId);
	
	const comments = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: { ...post, comments  },
	};
};
