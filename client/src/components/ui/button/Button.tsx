import { FC, ReactNode } from 'react';
import './Button.sass';

type TypeProps = {
	children: string | ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?: (T: string) => void
	props?: any;
};

export const Button: FC<TypeProps> = ({ children, className, disabled,onClick, ...props }) => {
	return (
		<button {...props} className={`button ${className}`}>
			{children}
		</button>
	);
};
