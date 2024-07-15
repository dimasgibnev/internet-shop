import { setUserRole } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (hash, id, newRoleId) => {
	const accessRoles = [ROLE.ADMIN];
	const access = sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен!',
			res: null,
		};
	}

	setUserRole(id, newRoleId);

	return {
		error: null,
		res: true,
	};
};
