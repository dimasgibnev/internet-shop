import { Logo } from '../Logo';
import { useState } from 'react';
import { useUser } from '../../../../hooks/useUser';
import { LinkWrapper } from '../LinkWrapper';
import { Profile } from './components/Profile';
import { SearchPanel } from './components/SearchPanel';
import styles from'./Navigation.module.sass';

export const Navigation = () => {
	const [searchPrhase, setSearchPrhase] = useState('');
	const { user, getUserName } = useUser();

	return (
		<div className={styles.navigation}>
			<Logo />

			<SearchPanel searchPrhase={searchPrhase} setSearchPrhase={setSearchPrhase} />

			<LinkWrapper path={'/cart'} className="navigation">
				<i className="fa-solid fa-cart-shopping"></i>
			</LinkWrapper>

			<LinkWrapper path={'/wishlist'} className="navigation">
				<i className="fa-regular fa-heart"></i>
			</LinkWrapper>

			{user ? (
				<Profile user={user} getUserName={getUserName} />
			) : (
				<LinkWrapper path={'/login'} className="navigation">
					Вход
				</LinkWrapper>
			)}
		</div>
	);
};
