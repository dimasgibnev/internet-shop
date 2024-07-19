export const deleteUser = (userId) => {
	fetch(`http://localhost:3005/users/${userId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json; charset-utf-8',
		},

	});
};
