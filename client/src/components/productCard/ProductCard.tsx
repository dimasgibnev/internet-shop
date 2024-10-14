import { Link } from 'react-router-dom';

import { CartInfo } from './components/cart-info/CartInfo';
import { Stars, Icon } from '../ui';

import { IProduct } from '../../interface/product.interface';

import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAppSelector } from '../../hooks/hooks';

import './ProductCard.sass';
import { formatePrice } from '../../utils/formatePrice';

export const ProductCard = ({ product }: { product: IProduct }) => {
	const {handleAddToWishList, inWish} = useWishlist(product)
	const { inCart, handleAddToCart, handleRemoveFromCart } = useCart(product);
	const isLoading = useAppSelector((state) => state.user.isLoading);
	const totalRating = product?.totalRating;

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
				<span className="product-card__price">{formatePrice(`${product.price}`)} ₽</span>

				<Icon
					onClick={() => !isLoading && handleAddToWishList(product._id)}
					className={`product-card__wishlist ${inWish && 'active'}`}
					icon={'heart'}
					weight={inWish ? 'solid' : 'regular'}
				/>

				{inCart ? (
					<CartInfo id={product._id} remove={handleRemoveFromCart} />
				) : (
					<Icon
						onClick={() => !isLoading && handleAddToCart(product)}
						className="product-card__cart"
						icon={'add'}
						weight={'solid'}
					/>
				)}
			</div>
		</div>
	);
};
