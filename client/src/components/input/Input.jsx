import { forwardRef } from 'react';
import './Input.sass';

export const Input = forwardRef(({ className, ...props }, ref) => {

	return <input ref={ref} {...props} className={`${className} input`} />;
});
