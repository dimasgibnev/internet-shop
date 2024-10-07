import { useRef } from 'react';
import { Input } from '../../../../input/Input';
import { Icon } from '../../../../icon/Icon';

export const SearchPanel = ({ searchPrhase, setSearchPrhase }) => {
	const inputRef = useRef(null);

	const onClearInput = () => {
		setSearchPrhase('');
		inputRef.current.focus();
	};

	const onSearch = (e) => {
		setSearchPrhase(e.target.value);
	};

	return (
		<div className="navigation__input-wrapper">
			<Input
				ref={inputRef}
				className="navigation__input"
				placeholder="Поиск..."
				value={searchPrhase}
				onChange={(e) => setSearchPrhase(e.target.value)}
			/>
			<Icon
				className="navigation__search-wrapper"
				icon="magnifying-glass"
				weight="solid"
				onClick={onSearch}
			/>

			{searchPrhase && (
				<Icon
					className="navigation__close-wrapper"
					icon="xmark"
					weight="solid"
					onClick={onClearInput}
				/>
			)}
		</div>
	);
};
