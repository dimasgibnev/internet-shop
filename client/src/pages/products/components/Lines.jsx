import { Button } from '../../../components/ui';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../../store/slices/filterSlice';

import styles from '../Products.module.sass';
import { fetchProducts } from '../../../store/slices/productsSlice';

export const Lines = () => {
	const dispatch = useDispatch();
	const filter = useSelector(selectFilter);

	const handleSetLine = (line) => {
		const finalFilter = { ...filter, line };

		dispatch(fetchProducts(finalFilter));
	};

	return (
		<div className={styles.lines}>
			<Button onClick={() => handleSetLine('cordless')}>Аккумуляторные</Button>
			<Button onClick={() => handleSetLine('corded')}>Сетевые</Button>
			<Button onClick={() => handleSetLine('gas')}>Бензотехника</Button>
		</div>
	);
};
