import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../store/slices/authSlice';
import {
	addToCart,
	addToCartAsync,
	removeFromCart,
	removeFromCartAsync,
	selectCart,
} from '../store/slices/userSlice';

export const useCart = (product) => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const cart = useSelector(selectCart);
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
