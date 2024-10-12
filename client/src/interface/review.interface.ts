import { IUser } from './user.interface';

export interface IReview {
	star: number;
	comment: string | '';
	postedBy: IUser;
	_id: string;
	createdAt: string;
	totalRating?: number;
}
