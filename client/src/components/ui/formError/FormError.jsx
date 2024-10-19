import './FormError.sass';

export const FormError = ({ error, className }) => {
	return <span className={`${className} error`}>{error}</span>;
};
