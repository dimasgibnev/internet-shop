import { transformUser } from '../transformers';

export const getUser = async (userLogin) => {
	return fetch(`http://localhost:3005/users?login=${userLogin}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
};
