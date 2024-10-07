import './Icon.sass';

export const Icon = ({ className, icon, weight,  ...props }) => {
	return (
		<div className={!!className ? `${className} icon-wrapper` : `icon-wrapper`} {...props}>
			<i className={`fa-${weight} fa-${icon}`}></i>
		</div>
	);
};
