import { useState } from 'react';
import { useUser } from '../../../../hooks/useUser';
import './Dashboard.sass';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
	const { user, getUserName } = useUser();
	const [activeLink, setActiveLink] = useState(false);

	const links = [
		{ title: getUserName(), path: '/profile' },
		{ title: 'Личные данные', path: '/profile/data' },
		{ title: 'Заказы', path: '/profile/orders' },
		{ title: 'Избранное', path: '/profile/wishlist' },
		{ title: 'Выйти', path: '/' },
	];
	return (
		<div className="profile-dashboard">
			<div className="profile-dashboard__left-column dashboard-menu">
				<ul className="links">
					{links.map((link, i) => (
						<Link className="links-item" to={link.path} key={i}>
							{link.title}
						</Link>
					))}
				</ul>
			</div>
			<div className="profile-dashboard__right-column"></div>
		</div>
	);
};
