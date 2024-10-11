import { IUser } from "./user.interface";

export interface IReview {
	star: number | undefined;
	comment: string | undefined;
	postedBy: IUser | undefined;
	_id: string | undefined;
	createdAt: string | undefined;
	totalRating?: number | undefined;
}