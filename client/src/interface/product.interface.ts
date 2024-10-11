import { IUser } from './user.interface';
export interface IProduct {
	_id: string;
	title: string;
	slug: string;
	images: { url: string; title: 'main' | 'secondary' }[];
	cordless: boolean;
	description: string;
	price: number;
	category: string;
	line: string;
	series: string;
	quantity: number;
	specs: string;
	ratings: {
		star: number;
		comment: string;
		postedBy: IUser;
	}[];
	totalRating: number;
}
