import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { useEffect } from 'react';

import { Logo } from '../Logo';
import { LinkWrapper } from '../LinkWrapper';
import { Profile } from './components/Profile';
import { SearchPanel } from './components/search-panel/SearchPanel';
import { Menu } from './components/menu/Menu';

import {
	fetchSearchedProducts,
	resetProducts,
} from '../../../../store/slices/productsSlice';
import { selectSearch, setSearch } from '../../../../store/slices/filterSlice';
import { selectCart, selectUser, selectWishes } from '../../../../store/slices/userSlice';

import styles from './Navigation.module.sass';

export const Navigation = () => {
	const dispacth = useAppDispatch();
	const user = useAppSelector(selectUser)
	const wishlist = useAppSelector(selectWishes)
	const cart = useAppSelector(selectCart);

	const searchPhrase = useAppSelector(selectSearch);
	const filter = useAppSelector((state) => state.filter);

	const onSearch = ({ target }) => {
		dispacth(setSearch(target.value));
	};

	useEffect(() => {
		const finalFilter = { search: searchPhrase };

		if (searchPhrase) {
			dispacth(fetchSearchedProducts(finalFilter));
		} else if (searchPhrase === '') {
			dispacth(resetProducts());
		}
	}, [dispacth, searchPhrase]);

	return (
		<div className={styles.navigation}>
			<Logo />
			<Menu />
			<SearchPanel searchPrhase={searchPhrase} onChange={onSearch} />

			<LinkWrapper path={'/cart'} className={styles.link}>
				<i className="fa-solid fa-cart-shopping">
					{cart.length > 0 && (
						<div className={styles.cart}>
							{cart.length < 10 ? cart.length : 9 + '+'}
						</div>
					)}
				</i>
			</LinkWrapper>

			<LinkWrapper path={'/wishlist'} className={styles.link}>
				<i className={wishlist.length > 0 ? `fa-solid fa-heart` : `fa-regular fa-heart`}></i>
			</LinkWrapper>

			{user ? (
				<Profile user={user}  />
			) : (
				<LinkWrapper path={'/login'} className={styles.link}>
					Вход
				</LinkWrapper>
			)}
		</div>
	);
};
