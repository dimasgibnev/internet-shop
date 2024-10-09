import { Link } from 'react-router-dom';
import styles from '../Header.module.sass';

export const Logo = () => {
	return (
		<div className={styles.logo}>
			<Link to={'/'}>
				<img src={'/img/makita-logo.png'} alt="logo makita" />
			</Link>
		</div>
	);
};
