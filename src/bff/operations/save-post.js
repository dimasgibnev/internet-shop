import { addPost, updatePost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN];
	const access = sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен!',
			res: null,
		};
	}

	const savedPost = await newPostData.id === '' ?  addPost(newPostData) : updatePost(newPostData);

	return {
		error: null,
		res: savedPost,
	};
};
