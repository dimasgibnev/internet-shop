import { IUser } from './user.interface';
export interface IProduct {
	_id: string;
	title: string;
	slug: string;
	images: { url: string; title: 'main' | 'secondary' }[];
	cordless: boolean;
	description: string;
	price: string;
	category: string;
	line: string;
	series: string;
	quantity: string;
	specs: string;
	ratings: {
		star: number;
		comment: string;
		postedBy: IUser;
	}[];
	totalRating: {
		type: String;
		default: '0';
	};
}
