import { selectUser } from '../store/slices/authSlice';
import {
	addToCart,
	addToCartAsync,
	removeFromCart,
	removeFromCartAsync,
	selectCart,
} from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useCart = (product) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const cart = useAppSelector(selectCart);
	const inCart = cart.some((cartItem) => cartItem.product._id === product?._id);

	const handleAddToCart = (product) => {
		if (user) {
			dispatch(addToCart(product));
			dispatch(addToCartAsync(product._id));
		} else {
			dispatch(addToCart(product));
		}
	};

	const handleRemoveFromCart = (id) => {
		if (!user) {
			dispatch(removeFromCart(id));
		} else {
			dispatch(removeFromCart(id));
			dispatch(removeFromCartAsync(id));
		}
	};

	return { inCart, handleAddToCart, handleRemoveFromCart };
};
