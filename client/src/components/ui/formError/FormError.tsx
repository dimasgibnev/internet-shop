import { FC } from 'react';

import './FormError.sass';

interface IFormError {
	error: string;
	className: 'server-error' | 'form-error';
}

export const FormError: FC<IFormError> = ({ error, className }) => {
	return <span className={`${className} error`}>{error}</span>;
};
