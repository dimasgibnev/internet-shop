import { Input } from '../../../../input/Input';

export const SearchPanel = ({ searchPrhase, setSearchPrhase }) => {
	return (
		<div className="navigation__input-wrapper">
			<Input
				className="navigation__input"
				placeholder="Поиск..."
				value={searchPrhase}
				onChange={(e) => setSearchPrhase(e.target.value)}
			/>
			<div className="navigation__search-wrapper">
				<i className="fa-solid fa-magnifying-glass"></i>
			</div>
		</div>
	);
};
