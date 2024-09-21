import './Dashboard.sass';

export const Dashboard = () => {
	return (
		<div className="profile-dashboard">
			<div className="profile-dashboard__left-column">
				<ul className="left-column__links">
					<li className="list__links-item">Личный кабинет</li>
					<li className="list__links-item">Личные данные</li>
					<li className="list__links-item">Заказы</li>
					<li className="list__links-item">Избранное</li>
					<li className="list__links-item">Выйти</li>
				</ul>
			</div>
			<div className="profile-dashboard__right-column"></div>
		</div>
	);
};
