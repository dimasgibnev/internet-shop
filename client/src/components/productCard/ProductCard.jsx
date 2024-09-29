import { useEffect, useState } from 'react';
import { Icon } from '../icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMe, userSelector } from '../../store/authSlice';
import {
	addToCart,
	addToCartAsync,
	addToWishList,
	addToWishListAsync,
} from '../../store/userSlice';
import './ProductCard.sass';

export const ProductCard = ({ id, image, title, model, price }) => {
	const dispatch = useDispatch();
	const [active, setActive] = useState(false);
	const user = useSelector(userSelector);
	const wishList = useSelector((state) => state.user.wishList);
	const cart = useSelector((state) => state.user.cart);
	const product = cart.find((item) => item.id === id);

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
			dispatch(addToCart({id}));
		} else {
			dispatch(addToCartAsync(id)).then(() => dispatch(fetchMe()));
		}
	};

	return (
		<div className="product-card">
			<div className="product-card__image-wrapper">
				<Link to={`/products/${id}`}>
					<img src={image} alt={title} />
				</Link>
			</div>

			<div className="product-card__info">
				<span className="product-card__model">{model}</span>
				<span className="product-card__title">{title}</span>
				<span className="product-card__price">{price} ₽</span>
			</div>

			<Icon
				onClick={() => handleAddToWishList(id)}
				className={`product-card__wishlist ${active && 'active'}`}
				icon={'heart'}
				weight={active ? 'solid' : 'regular'}
			/>

			<Icon
				onClick={() => handleAddToCart(id)}
				className="product-card__cart"
				icon={'add'}
				weight={'solid'}
			/>
		</div>
	);
};
