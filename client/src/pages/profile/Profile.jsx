import { Dashboard } from './components/dashboard/Dashboard';
import './Profile.sass';

export const Profile = () => {
	return (
		<section className="profile">
			<div className="container">
				<div className="profile__header">
					<h1 className="main__title">Профиль</h1>
				</div>
				<Dashboard />
			</div>
		</section>
	);
};
