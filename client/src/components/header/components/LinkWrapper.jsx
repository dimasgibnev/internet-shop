import { Link } from 'react-router-dom';

import styles from '../Header.module.sass';

export const LinkWrapper = ({ path, className, children }) => {
	return (
		<div className={className}>
			<Link to={path} className={styles.link}>
				{children}
			</Link>
		</div>
	);
};
