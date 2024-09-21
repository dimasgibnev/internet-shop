import { Link } from 'react-router-dom';

export const Logo = () => {
	return (
		<div>
			<Link to={'/'}>
				<img
					className="logo"
					src="https://cdn.makitatools.com//apps/cms/logo/d6fd3a5a-a919-46f1-9e08-bdc4345cb039_makita_l_500px.png?w=120&trim.threshold=80&trim.percentpadding=1"
					alt="logo makita"
				/>
			</Link>
		</div>
	);
};
