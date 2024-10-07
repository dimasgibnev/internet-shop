import React from 'react';
import './Icon.sass';
export const Icon = ({ className, icon, weight, onClick, ...props }) => {
	return (
		<div className={!!className ? `${className} icon-wrapper` : `icon-wrapper`} onClick={onClick} {...props}>
			<i className={`fa-${weight} fa-${icon}`}></i>
		</div>
	);
};
