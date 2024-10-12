import { IProduct } from './product.interface';

export interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	mobile: string | number;
	password: string;
	roleId: number;
	cart: {
		product: IProduct;
		count: number;
	}[];

	adress: string;
	orders: IProduct[];
	wishList: {
		product: IProduct;
		count: number;
	}[];
}
