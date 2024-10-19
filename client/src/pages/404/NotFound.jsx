import styles from './NotFound.module.sass';

export const NotFound = () => {
	return (
		<div className={styles['not-found']}>
			<h1>404</h1>
			<p>Страница не найдена</p>
		</div>
	);
};
