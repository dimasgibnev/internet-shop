import { Link, useMatch } from 'react-router-dom';

import { Info } from '../info/Info';
import { Orders } from '../orders/Orders';
import { Order } from '../order/Order';

import { useDispatch } from 'react-redux';
import { resetUser} from '../../../../store/slices/userSlice';

import styles from './Dashboard.module.sass';

export const Dashboard = () => {
	const dispatch = useDispatch();
	const isOrders = useMatch('/profile/orders');
	const isOrder = useMatch('/profile/orders/:id');

	const links = [
		{ title: 'Мой кабинет', path: '/profile' },
		{ title: 'Заказы', path: '/profile/orders' },
		{
			title: 'Выйти',
			path: '/',
			onclick: () => {
				dispatch(resetUser());
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
			<div className={styles.right}>
				{!isOrders && !isOrder ? <Info /> : isOrder ? <Order /> : <Orders />}
			</div>
		</div>
	);
};
