import mongoose from 'mongoose';
import validator from 'validator';

const CommentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			
		}

	},
	{
		timestamps: true,
	},
);

export const CommentModel = mongoose.model('Comment', CommentSchema);
