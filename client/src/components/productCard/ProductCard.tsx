import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
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
	selectCart,
	selectUser,
	selectWishes,
} from '../../store/slices/userSlice';

import { Stars } from '../ui';
import { IProduct } from '../../interface/product.interface';

import './ProductCard.sass';

export const ProductCard = ({ product }: { product: IProduct }) => {
	const dispatch = useAppDispatch();

	const totalRating = product?.totalRating;
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const user = useAppSelector(selectUser);
	const wishList = useAppSelector(selectWishes);
	const cart: { product: IProduct; count: number }[] = useAppSelector(selectCart);

	const productInCart = cart.some(({ product: item }) => item._id === product._id);
	const inWishes = wishList.some(({ product: item }) => item._id === product._id);



	const handleAddToWishList = (id: string): void => {
		if (!user) {
			dispatch(addToWishList(product));
		} else {
			dispatch(addToWishListAsync(id));
		}
	};

	const handleAddToCart = (id: string): void => {
		if (!user) {
			dispatch(addToCart(product));
		} else {
			dispatch(addToCartAsync(id));
		}
	};

	const handleRemoveFromCart = (id: string): void => {
		if (!user) {
			dispatch(removeFromCart(product));
		} else {
			dispatch(removeFromCartAsync(id));
		}
	};

	return (
		<div className="product-card">
			<Link to={`/products/details/${product._id}`}>
				<div className="product-card__image-wrapper">
					<img src={product.images[0].url} alt={product.title} />

					<Stars selected={totalRating} className="stars" />
				</div>
			</Link>
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
					onClick={() => !isLoading && handleAddToWishList(product._id)}
					className={`product-card__wishlist ${inWishes && 'active'}`}
					icon={'heart'}
					weight={inWishes ? 'solid' : 'regular'}
				/>

				{productInCart ? (
					<CartInfo id={product._id} remove={handleRemoveFromCart} />
				) : (
					<Icon
						onClick={() => !isLoading && handleAddToCart(product._id)}
						className="product-card__cart"
						icon={'add'}
						weight={'solid'}
					/>
				)}
			</div>
		</div>
	);
};
