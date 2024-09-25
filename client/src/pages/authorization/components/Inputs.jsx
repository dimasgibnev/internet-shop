import { useFormContext } from 'react-hook-form';
import { FormError, Input } from '../../../components';

export const Inputs = () => {
	const {
		register,
		formState: { errors },
		clearErrors,
	} = useFormContext();
	const emailError = errors?.email?.message;
	const passwordError = errors?.password?.message;

	return (
		<>
			<div className="auth__input-wrapper">
				<Input
					{...register('email', {
						onChange: () => clearErrors('serverError'),
					})}
					className="form__input"
					name="email"
					type="email"
					placeholder="введите почту"
				/>
				{emailError && <FormError className="form-error" error={errors.email?.message} />}
			</div>

			<div className="auth__input-wrapper">
				<Input
					{...register('password', {
						onChange: () => clearErrors('serverError'),
					})}
					className="form__input"
					name="password"
					type="password"
					placeholder="введите пароль"
				/>
				{passwordError && <FormError className='form-error' error={passwordError} />}
			</div>
		</>
	);
};
