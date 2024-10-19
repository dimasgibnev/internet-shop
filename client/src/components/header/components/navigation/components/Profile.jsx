import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Popup } from '../../../../ui/popup/Popup';

import { resetUser, selectUser } from '../../../../../store/slices/userSlice';
import { getUserName } from '../../../../../utils/getUserName';

import styles from '../Navigation.module.sass';

export const Profile = () => {
	const dispatch = useDispatch();
	const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
	const user = useSelector(selectUser);

	const openProfileMenu = () => {
		setProfileMenuIsOpen(true);
	};

	const closeProfileMenu = () => {
		setProfileMenuIsOpen(false);
	};

	const handleLogout = () => {
		dispatch(resetUser());
	};

	const links = [
		<Link>{user && <b>{user.firstName + ' ' + user.lastName}</b>}</Link>,
		<Link to={'/profile'}>Мой кабинет</Link>,
		<Link to={'/profile/orders'}>Заказы</Link>,
		<Link to={'/'} onClick={handleLogout}>
			Выйти
		</Link>,
	];

	return (
		<div
			className={styles.link}
			onMouseEnter={openProfileMenu}
			onMouseLeave={closeProfileMenu}
		>
			<span className="header__link">{getUserName(user)}</span>
			<Popup className={styles.menu} isOpen={profileMenuIsOpen} links={links} />
		</div>
	);
};
