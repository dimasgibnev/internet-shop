import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProfileMenu } from './profile-menu/ProfileMenu';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../../store/slices/authSlice';
import { useUser } from '../../../../../hooks/useUser';

export const Profile = () => {
	const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
	const dispacth = useDispatch();
	const navigate = useNavigate();
	const { user, getUserName } = useUser();

	const openProfileMenu = () => {
		setProfileMenuIsOpen(true);
	};

	const closeProfileMenu = () => {
		setProfileMenuIsOpen(false);
	};

	const handleLogout = () => {
		dispacth(logout()).then(() => {
			navigate('/');
		});
	};

	const links = [
		<Link>{user && <b>{getUserName()}</b>}</Link>,
		<Link to={'/profile'}>Мой кабинет</Link>,
		<Link to={'/profile/data'}>Личные данные</Link>,
		<Link to={'/profile/orders'}>Заказы</Link>,
		<Link to={'/profile/wishlist'}>Избранное</Link>,
		<Link to={'/'} onClick={handleLogout}>
			Выйти
		</Link>,
	];

	return (
		<div
			className="navigation__link-wrapper"
			onMouseEnter={openProfileMenu}
			onMouseLeave={closeProfileMenu}
		>
			<span className="header__link">{getUserName('short')}</span>
			<ProfileMenu
				className={'navigation'}
				isOpen={profileMenuIsOpen}
				links={links}
			/>
		</div>
	);
};
