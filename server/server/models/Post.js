import mongoose from 'mongoose';
import validator from 'validator';

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
			validate: {
				validator: validator.isURL,
				message: 'Некорректная ссылка',
			},
		},
		content: {
			type: String,
			required: true,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{
		timestamps: true,
	},
);

export const PostModel = mongoose.model('Post', PostSchema);
