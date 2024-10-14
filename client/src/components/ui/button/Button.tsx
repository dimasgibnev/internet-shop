import { FC } from 'react';
import styles from './Button.module.sass';

type Props = {
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
};
export const Button: FC<Props> = ({ children, className, disabled, ...props }) => {
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
