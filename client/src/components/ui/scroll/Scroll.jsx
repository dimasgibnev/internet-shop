import { Icon } from '../icon/Icon';

import styles from './Scroll.module.sass';

export const Scroll = () => {
	const scrollToTop = () => {
		document.getElementById('root').scrollTo({ top: 0, behavior: 'smooth' });
	};
	return (
		<Icon
			onClick={scrollToTop}
			icon={'chevron-up'}
			weight={'solid'}
			className={styles['scroll-up']}
		/>
	);
};
