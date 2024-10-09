import { setSort } from '../../../store/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Sort.module.sass';

export const Sort = () => {
	const dispatch = useDispatch();
	const sort = useSelector((state) => state.filter.sort);
	const list = [
		{ name: 'Рейтингу', sort: 'totalRating', order: 'desc' },
		{ name: 'Цене', sort: 'price', order: 'desc' },
		{ name: 'Новизне', sort: 'createdAt', order: 'desc' },
	];

	const handleSortChange = (newSort) => {
		const isSameSort = sort.name === newSort.name;
		const isDesc = sort.order === 'desc';
		let newOrder = 'desc';

		if (isSameSort && isDesc) {
			newOrder = 'asc';
		}

		dispatch(setSort({ ...newSort, order: newOrder }));
	};

	return (
		<div className={styles.sort}>
			<span className={styles.title}>Сортировать по: </span>
			<ul className={styles.list}>
				{list.map((obj, i) => {
					return (
						<li
							className={
								sort.name === obj.name ? styles.active : styles.item
							}
							key={i}
							onClick={() => {
								handleSortChange(obj);
							}}
						>
							{obj.name}
							{obj.name === sort.name && sort.order === 'desc'
								? ' ↓'
								: obj.name === sort.name && sort.order === 'asc'
									? ' ↑'
									: ''}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
