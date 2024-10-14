import { useFormContext } from 'react-hook-form';
import { FormError, Input } from '../../../components/ui';
import { useDispatch } from 'react-redux';
import { clearError } from '../../../store/slices/authSlice';

export const Inputs = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const emailError = errors?.email?.message;
	const passwordError = errors?.password?.message;
	const dispatch = useDispatch();
	
	return (
		<>
			<div className="auth__input-wrapper">
				<Input
					{...register('email', {
						onChange: () => dispatch(clearError()),
					})}
					className="form__input"
					name="email"
					type="email"
					placeholder="введите почту"
				/>
				{emailError && (
					<FormError className="form-error" error={errors.email?.message} />
				)}
			</div>

			<div className="auth__input-wrapper">
				<Input
					{...register('password', {
						onChange: () => dispatch(clearError()),
					})}
					className="form__input"
					name="password"
					type="password"
					placeholder="введите пароль"
				/>
				{passwordError && (
					<FormError className="form-error" error={passwordError} />
				)}
			</div>
		</>
	);
};
