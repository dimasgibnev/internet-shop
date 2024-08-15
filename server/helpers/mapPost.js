import mongoose from 'mongoose';
import { mapComment } from './mapComment.js';

export const mapPost = (post) => {
	return {
		id: post._id,
		imageUrl: post.imageUrl,
		title: post.title,
		content: post.content,
		publishedAt: post.createdAt,
		comments: post.comments.map((comment) =>
			mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment),
		),
	};
};
