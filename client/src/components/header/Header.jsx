import { Navigation } from './components/navigation/Navigation';
import styles from './Header.module.sass';

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className="container ">
				<Navigation />
			</div>
		</header>
	);
};
