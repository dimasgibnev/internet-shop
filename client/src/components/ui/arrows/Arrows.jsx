import { Icon } from '../icon/Icon';

import styles from './Arrows.module.sass';

export const Arrows = ({ children, page, setPage }) => {
	const handleClick = () => {
		if (page === 1) {
			setPage(2);
		} else {
			setPage(1);
		}
	};

	return (
		<div className={styles.arrows}>
			<Icon
				className={styles.left}
				icon={'chevron-left'}
				weight={'solid'}
				onClick={handleClick}
			/>
			<div className={styles.products}>{children}</div>
			<Icon
				className={styles.right}
				icon={'chevron-right'}
				weight={'solid'}
				onClick={handleClick}
			/>
		</div>
	);
};
