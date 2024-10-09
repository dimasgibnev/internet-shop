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
				onClick={() => setCurrentPage(currentPage - 1)}
			>
				назад
			</Button>
			{currentPage === 1 ? <div></div> : <div>{currentPage - 1}</div>}
			<div className={styles.current}>{currentPage}</div>
			{currentPage === lastPage ? <div></div> : <div>{currentPage + 1}</div>}
			<Button
				disabled={currentPage === lastPage}
				onClick={() => setCurrentPage(currentPage + 1)}
			>
				вперед
			</Button>
		</div>
	);
};
