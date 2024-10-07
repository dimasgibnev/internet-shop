import { Dashboard } from './components/dashboard/Dashboard';

import styles from './Profile.module.sass';

export const Profile = () => {
	return (
		<section className={styles.profile}>
			<div className={styles.header}>
				<h1 className={styles.title}>Профиль</h1>
			</div>
			<Dashboard />
		</section>
	);
};
