import { Link } from 'react-router-dom';
export const Logo = () => {
	return (
		<div>
			<Link to={'/'}>
				<img className="logo" src={'/img/makita-logo.png'} alt="logo makita" />
			</Link>
		</div>
	);
};
