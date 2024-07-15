export const deletePost = (postId) => {
	fetch(`http://localhost:3005/posts/${postId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json; charset-utf-8',
		},
	});
};
