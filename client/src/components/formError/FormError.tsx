import './FormError.sass';
import React from 'react';

interface FormErrorProps {
	error: string;
	className: 'server-error' | 'form-error';
}

export const FormError = ({ error, className }: FormErrorProps) => {
	return <span className={`${className} error`}>{error}</span>;
};
