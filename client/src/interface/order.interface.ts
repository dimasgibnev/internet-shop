import { IProduct } from './product.interface';
import { IUser } from './user.interface';

export interface IOrder {
	_id: string;
	createdAt: string;
	products: {
		product: IProduct;
		count: number;
	}[];
	totalPrice: string
	orderStatus: string;
	orderby: IUser;
}
