import { deleteComment, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils/get-comments-with-author';

export const removePostComment = async (hash, id, postId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен!',
			res: null,
		};
	}

	await deleteComment(id);

	const post = await getPost(postId);

	const comments = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: { ...post, comments },
	};
};
