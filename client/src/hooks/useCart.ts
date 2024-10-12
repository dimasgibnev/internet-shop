import { IProduct } from '../interface/product.interface';
import { selectUser } from '../store/slices/authSlice';
import {
	addToCart,
	addToCartAsync,
	removeFromCart,
	removeFromCartAsync,
	selectCart,
} from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useCart = (product: IProduct) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const cart = useAppSelector(selectCart);
	const inCart = cart.some((cartItem) => cartItem.product._id === product?._id);

	const handleAddToCart = (id: string) => {
		if (user) {
			dispatch(addToCart(id));
			dispatch(addToCartAsync(id));
		} else {
			dispatch(addToCart(id));
		}
	};

	const handleRemoveFromCart = (id: string): void => {
		if (!user) {
			dispatch(removeFromCart(id));
		} else {
			dispatch(removeFromCart(id));
			dispatch(removeFromCartAsync(id));
		}
	};

	return { inCart, handleAddToCart, handleRemoveFromCart };
};
