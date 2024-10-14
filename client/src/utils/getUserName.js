export const getUserName = (user) => {
	if (user.firstName && user.lastName) {
		return user.firstName.slice(0, 1) + '. ' + user.lastName.slice(0, 1) + '.';
	}
};
