import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export const ControlPanel = () => {
	return (
		<div className="control-panel">
			<Logo />
			<div className="control-panel__input-wrapper">
				<input placeholder='Поиск...'/>
				<div className="control-panel__search-wrapper">
					<i className="fa-solid fa-magnifying-glass"></i>
				</div>
			</div>

			<div className="control-panel__link-wrapper">
				<Link to={'/cart'}><i className="fa-solid fa-cart-shopping"></i></Link>
			</div>
			<div className="control-panel__link-wrapper">
				<Link to={'/wishlist'}><i className="fa-regular fa-heart"></i></Link>
			</div>
			<div className="control-panel__link-wrapper">
				<Link to={'/profile'}><i className="fa-regular fa-user"></i></Link>
			</div>
			<div className="control-panel__link-wrapper">
				<Link to={'/login'}>Вход</Link>
			</div>
		</div>
	);
};
