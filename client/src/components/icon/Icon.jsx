import React from 'react';
import './Icon.sass';
export const Icon = ({ className, icon, weight, onClick }) => {
	return (
		<div className={`${className} icon-wrapper`} onClick={onClick}>
			<i className={`fa-${weight} fa-${icon}`}></i>
		</div>
	);
};
