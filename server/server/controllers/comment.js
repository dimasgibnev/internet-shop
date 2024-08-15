import { CommentModel } from '../models/Comment.js';
import { PostModel } from '../models/Post.js';

export const addComment = async (postId, comment) => {
	const newComment = await CommentModel.create(comment);

	await PostModel.findByIdAndUpdate(postId, {
		$push: { comments: newComment },
	});

	await newComment.populate('author');

	return newComment;
};

export const deleteComment = async (postId, commentId) => {
	await CommentModel.findByIdAndDelete(commentId);

	await PostModel.findByIdAndUpdate(postId, {
		$pull: { comments: commentId },
	});
};


