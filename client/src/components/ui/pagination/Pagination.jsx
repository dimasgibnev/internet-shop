import { Button } from '../button/Button';

import styles from './Pagination.module.sass';

export const Pagination = ({
	currentPage,
	setCurrentPage,
	lastPage,
	disabled,
	className,
}) => {
	if (disabled) {
		return null;
	}

	return (
		<div className={styles.pagination + ' ' + className}>
			<Button
				disabled={currentPage === 1}
				onClick={() => !(currentPage === 1) && setCurrentPage(currentPage - 1)}
			>
				Назад
			</Button>
			{currentPage === 1 ? <div></div> : <div>{currentPage - 1}</div>}
			<div className={styles.current}>{currentPage}</div>
			{currentPage === lastPage ? <div></div> : <div>{currentPage + 1}</div>}
			<Button
				onClick={() => {
					!(currentPage === lastPage)
						? setCurrentPage(currentPage + 1)
						: setCurrentPage(1);
				}}
			>
				{currentPage === lastPage ? 'В начало' : 'Вперед'}
			</Button>
		</div>
	);
};
