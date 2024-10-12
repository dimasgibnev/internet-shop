import { FC, ReactNode } from 'react';
import './Button.sass';

type TypeProps = {
	children: string | ReactNode;
	className?: string;
	disabled?: boolean;
	props?: any;
	onClick?: () => void;
};

export const Button: FC<TypeProps> = ({ children, className, disabled, ...props }) => {
	return (
		<button {...props} className={`button ${className}`}>
			{children}
		</button>
	);
};
