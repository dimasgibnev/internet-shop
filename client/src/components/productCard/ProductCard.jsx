import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Icon } from '../ui/icon/Icon';
import { CartInfo } from './components/cart-info/CartInfo';

import { fetchMe } from '../../store/slices/authSlice';
import {
	addToCart,
	addToCartAsync,
	addToWishList,
	addToWishListAsync,
	removeFromCart,
	removeFromCartAsync,
} from '../../store/slices/userSlice';
import { useUser } from '../../hooks/useUser';

import './ProductCard.sass';

export const ProductCard = ({ product }) => {
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();

	const { user } = useUser();
	const guestCart = useSelector((state) => state.user.cart);
	const guestWishList = useSelector((state) => state.user.wishList);

	const cart = user?.cart ? user.cart : guestCart;
	const wishList = user?.wishList ? user.wishList : guestWishList;

	const productInCart = cart.find(({ product: item }) => item._id === product._id);
	const inWishes = wishList.some(({ product: item }) => item._id === product._id);

	useEffect(() => {
		setActive(inWishes);
	}, [inWishes, wishList, dispatch]);

	const handleAddToWishList = (id) => {
		if (!user) {
			dispatch(addToWishList(product));
		} else {
			dispatch(addToWishListAsync(id)).then(() => dispatch(fetchMe()));
		}
		setActive(!active);
	};

	const handleAddToCart = (id) => {
		if (!user) {
			dispatch(addToCart(product));
		} else {
			dispatch(addToCartAsync(id)).then(() => dispatch(fetchMe()));
		}
	};

	const handleRemoveFromCart = (id) => {
		if (!user) {
			dispatch(removeFromCart(product));
		} else {
			dispatch(removeFromCartAsync(id)).then(() => dispatch(fetchMe()));
		}
	};

	return (
		<div className="product-card">
			<div className="product-card__image-wrapper">
				<Link to={`/products/details/${product._id}`}>
					<img src={product.images[0].url} alt={product.title} />
				</Link>
			</div>

			<div className="product-card__info">
				<span className="product-card__model">{product.series}</span>
				<Link
					className="product-card__title"
					to={`/products/details/${product._id}`}
				>
					<span>{product.title}</span>
				</Link>
				<span className="product-card__price">{product.price} ₽</span>

				<Icon
					onClick={() => handleAddToWishList(product._id)}
					className={`product-card__wishlist ${active && 'active'}`}
					icon={'heart'}
					weight={active ? 'solid' : 'regular'}
				/>

				{productInCart?.count > 0 ? (
					<CartInfo
						count={productInCart.count}
						id={product._id}
						remove={handleRemoveFromCart}
					/>
				) : (
					<Icon
						onClick={() => handleAddToCart(product._id)}
						className="product-card__cart"
						icon={'add'}
						weight={'solid'}
					/>
				)}
			</div>
		</div>
	);
};
