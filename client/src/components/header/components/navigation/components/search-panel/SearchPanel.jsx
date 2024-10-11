import { Link } from 'react-router-dom';
import { useRef } from 'react';

import { Input } from '../../../../../ui/input/Input';
import { Icon } from '../../../../../ui/icon/Icon';

import { selectSearch, setSearch } from '../../../../../../store/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchedProducts } from '../../../../../../store/slices/productsSlice';

import styles from './SearchPanel.module.sass';

export const SearchPanel = ({ onChange }) => {
	const searchPhrase = useSelector(selectSearch);
	const products = useSelector(selectSearchedProducts);
	const inputRef = useRef(null);
	const dispatch = useDispatch();

	const onClearInput = () => {
		dispatch(setSearch(''));
		inputRef.current.focus();
	};

	return (
		<div className={styles['input-wrapper']}>
			<Input
				ref={inputRef}
				className={styles.input}
				placeholder="Поиск..."
				value={searchPhrase}
				onChange={onChange}
			/>
			<Icon
				className={styles['search-wrapper']}
				icon="magnifying-glass"
				weight="solid"
				onClick={() => dispatch(setSearch(searchPhrase))}
			/>
			<div className={styles.popup}>
				{products?.length > 0 && (
					products.map((product) => (
						<Link
							to={`/products/details/${product._id}`}
							key={product._id}
							className={styles.item}
						>
							<img src={product.images[0].url} alt={product.title} />
							{product.title}
						</Link>
					))
				) }
			</div>

			{searchPhrase && (
				<Icon
					className={styles['close-wrapper']}
					icon="xmark"
					weight="solid"
					onClick={onClearInput}
				/>
			)}
		</div>
	);
};
