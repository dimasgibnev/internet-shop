import styles from './Dots.module.sass';

export const Dots = ({ items, active, handleSetActive, className }) => {
	return (
		<div className={styles.dots}>
			{items.map((_, index) => (
				<div
					key={index}
					className={
						active === index
							? styles.dot + ' ' + styles['active-dot']
							: styles.dot
					}
					onClick={() => handleSetActive(index)}
				/>
			))}
		</div>
	);
};
