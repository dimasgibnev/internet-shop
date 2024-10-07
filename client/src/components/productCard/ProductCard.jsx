import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Icon } from '../icon/Icon';
import { CartInfo } from './components/cart-info/CartInfo';

import { fetchMe} from '../../store/slices/authSlice';
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

export const ProductCard = ({ id, image, title, model, price }) => {
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();
	const {user} = useUser();
	const guestCart = useSelector((state) => state.user.cart);
	const guestWishList = useSelector((state) => state.user.wishList);
	const cart = user ? user.cart : guestCart;
	const wishList = user ? user.wishList : guestWishList;
	const productInCart = cart.find((item) => item.product._id === id);

	useEffect(() => {
		if (wishList) setActive(wishList.includes(id));
	}, [wishList, id, dispatch]);

	const handleAddToWishList = (id) => {
		if (!user) {
			dispatch(addToWishList(id));
		} else {
			dispatch(addToWishListAsync(id)).then(() => dispatch(fetchMe()));
		}
		setActive(!active);
	};

	const handleAddToCart = (id) => {
		if (!user) {
			dispatch(addToCart(id));
		} else {
			dispatch(addToCartAsync(id)).then(() => dispatch(fetchMe()));
		}
	};
	const handleRemoveFromCart = (id) => {
		if (!user) {
			dispatch(removeFromCart(id));
		} else {
			dispatch(removeFromCartAsync(id)).then(() => dispatch(fetchMe()));
		}
	};

	return (
		<div className="product-card">
			<div className="product-card__image-wrapper">
				<Link to={`/products/details/${id}`}>
					<img src={image} alt={title} />
				</Link>
			</div>

			<div className="product-card__info">
				<span className="product-card__model">{model}</span>
				<Link className="product-card__title" to={`/products/details/${id}`}>
					<span>{title}</span>
				</Link>
				<span className="product-card__price">{price} ₽</span>

				<Icon
					onClick={() => handleAddToWishList(id)}
					className={`product-card__wishlist ${active && 'active'}`}
					icon={'heart'}
					weight={active ? 'solid' : 'regular'}
				/>

				{productInCart && productInCart.count > 0 ? (
					<CartInfo
						count={productInCart.count}
						id={id}
						remove={handleRemoveFromCart}
					/>
				) : (
					<Icon
						onClick={() => handleAddToCart(id)}
						className="product-card__cart"
						icon={'add'}
						weight={'solid'}
					/>
				)}
			</div>
		</div>
	);
};
