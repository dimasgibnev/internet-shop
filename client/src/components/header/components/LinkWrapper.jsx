import React from 'react';
import { Link } from 'react-router-dom';

export const LinkWrapper = ({ path, className, children }) => {
	return (
		<div className={`${className}__link-wrapper`}>
			<Link to={path} className="header__link">
				{children}
			</Link>
		</div>
	);
};
