export const getCommentsCount = (comments, postId) => {
	const postComments =
		comments.filter(({ postId: commentPostId }) => postId === commentPostId) || [];

	return postComments;
};
