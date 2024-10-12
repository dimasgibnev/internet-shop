import { IProduct } from './product.interface';
import { IUser } from './user.interface';

export interface IOrder {
	products: {
		product: IProduct;
		count: number;
	}[];

	orderStatus: string;

	orderby: IUser;
}
