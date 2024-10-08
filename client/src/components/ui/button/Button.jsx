import './Button.sass';

export const Button = ({ children, className, ...props }) => {
	return (
		<button {...props} className={`button ${className}`}>
			{children}
		</button>
	);
};
