import mongoose from 'mongoose';
import validator from 'validator';

const ProductSchema = new mongoose.Schema(
	{
		name: {
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
		cordless: {
			type: Boolean,
			required: true,
		},
		description: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Description',
			},
		],
	},
	{
		timestamps: true,
	},
);

export const ProductModel = mongoose.model('Post', ProductSchema);
