import './Menu.sass';

export const Menu = ({ isOpen, className, links }) => {
	return (
		<>
			{isOpen ? (
				<div className={`${className}__menu menu`}>
					<ul >
						{links.map((link, i) => (
							<li className='list__links-item' key={i}>{link}</li>
						))}
					</ul>
				</div>
			) : null}
		</>
	);
};
