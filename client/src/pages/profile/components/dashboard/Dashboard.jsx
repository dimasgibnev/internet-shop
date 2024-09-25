import './Dashboard.sass';

export const Dashboard = () => {
	return (
		<div className="profile-dashboard">
			<div className="profile-dashboard__left-column dashboard-menu">
				<ul className="left-column__links">
					<li className="dashboard-menu__item">Личный кабинет</li>
					<li className="dashboard-menu__item">Личные данные</li>
					<li className="dashboard-menu__item">Заказы</li>
					<li className="dashboard-menu__item">Избранное</li>
					<li className="dashboard-menu__item">Выйти</li>
				</ul>
			</div>
			<div className="profile-dashboard__right-column"></div>
		</div>
	);
};
