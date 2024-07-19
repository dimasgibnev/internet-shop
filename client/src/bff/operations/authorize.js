import { sessions } from '../sessions';
import { getUser } from '../api';

export const authorize = async ({ login: authLogin, password: authPassword }) => {
	const user = await getUser(authLogin);

	if (!user) {
		return {
			error: 'Такой пользователь не найден!',
			res: null,
		};
	}
	const { id, login, password, registredAt, roleId } = user;

	if (authPassword !== password) {
		return {
			error: 'Пароль неверный!',
			res: null,
		};
	}

	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			registredAt,
			session: sessions.create(user),
		},
	};
};
