export const deleteComment = (commentId) => {
	fetch(`http://localhost:3005/comments/${commentId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json; charset-utf-8',
		},
	});
};
