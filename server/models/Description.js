import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema(
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

export const DescriptionModel = mongoose.model('Comment', DescriptionSchema);
