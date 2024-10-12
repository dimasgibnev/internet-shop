import { IProduct } from '../interface/product.interface';
import {
	addToCart,
	addToCartAsync,
	removeFromCart,
	removeFromCartAsync,
	selectUser,
} from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useCart = (product: IProduct) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const inCart = user?.cart.some((cartItem) => cartItem.product._id === product?._id);

	const handleAddToCart = (id: string) => {
		if (user) {
			dispatch(addToCartAsync(id));
		} else {
			dispatch(addToCart(id));
		}
	};

	const handleRemoveFromCart = (id: string): void => {
		if (!user) {
			dispatch(removeFromCart(id));
		} else {
			dispatch(removeFromCartAsync(id));
		}
	};

	return { inCart, handleAddToCart, handleRemoveFromCart };
};
