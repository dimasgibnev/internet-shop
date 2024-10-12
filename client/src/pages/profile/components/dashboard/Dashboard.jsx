import { Link, useMatch } from 'react-router-dom';

import { logout } from '../../../../store/slices/authSlice';

import { Info } from '../info/Info';
import { Orders } from '../orders/Orders';

import { useUser } from '../../../../hooks/useUser';
import { useAppDispatch } from '../../../../hooks/hooks';

import styles from './Dashboard.module.sass';

export const Dashboard = () => {
	const dispatch = useAppDispatch();
	const { getUserName } = useUser();
	const isOrders = useMatch('/profile/orders');

	const links = [
		{ title: getUserName(), path: '/profile' },
		{ title: 'Заказы', path: '/profile/orders' },
		{
			title: 'Выйти',
			path: '/',
			onclick: () => {
				dispatch(logout());
			},
		},
	];

	return (
		<div className={styles.dashboard}>
			<div className={styles.left}>
				{links.map((link, i) => (
					<Link
						onClick={link.onclick}
						className={styles.item}
						to={link.path}
						key={i}
					>
						{link.title}
					</Link>
				))}
			</div>
			<div className={styles.right}>{!isOrders ? <Info /> : <Orders />}</div>
		</div>
	);
};
