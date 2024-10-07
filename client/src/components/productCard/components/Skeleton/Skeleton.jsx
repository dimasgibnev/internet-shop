import styles from './Skeleton.module.sass';

export const Skeleton = () => {
	return (
		<div className={styles.card}>
			<div className={styles.img}></div>

			<div className={styles.info}>
				<div className={styles.model}></div>
				<div className={styles.title}></div>
				<div className={styles.price}></div>
			</div>
		</div>
	);
};
