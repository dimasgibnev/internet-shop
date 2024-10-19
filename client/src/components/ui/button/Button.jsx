import styles from './Button.module.sass';

export const Button = ({ children, className, disabled, ...props }) => {
	return (
		<button
			{...props}
			className={`${styles.button} ${className}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
