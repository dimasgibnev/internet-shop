import { useFormContext } from 'react-hook-form';
import { FormError, Input } from '../../../components/ui';

export const Inputs = () => {
	const {
		register,
		watch,
		formState: { errors },
		clearErrors,
	} = useFormContext();

	const firstNameError = errors?.firstName?.message;
	const lastNameError = errors?.lastName?.message;
	const emailError = errors?.email?.message;
	const mobileError = errors?.mobile?.message;
	const passwordError = errors?.password?.message;
	const confirPasswordError = errors?.confirPassword?.message;

	return (
		<div className="inputs-wrapper">
			<div className="register-form__inputs">
				<div className="input-wrapper">
					<Input
						{...register('firstName')}
						className="register-form__input"
						type="text"
						placeholder="Имя"
					/>
					{firstNameError && (
						<FormError className="form-error" error={firstNameError} />
					)}
				</div>

				<div className="input-wrapper">
					<Input
						{...register('lastName')}
						className="register-form__input"
						type="text"
						placeholder="Фамилия"
					/>
					{lastNameError && (
						<FormError className="form-error" error={lastNameError} />
					)}
				</div>

				<div className="input-wrapper">
					<Input
						{...register('email', {
							onChange: () => clearErrors('serverError'),
						})}
						className="register-form__input"
						type="email"
						placeholder="Почта"
					/>
					{emailError && (
						<FormError className="form-error" error={emailError} />
					)}
				</div>
			</div>

			<div className="register-form__inputs">
				<div className="input-wrapper">
					<Input
						{...register('mobile', {
							onChange: () => clearErrors('serverError'),
						})}
						className="register-form__input"
						type="phone"
						placeholder="Мобильный телефон"
					/>
					{mobileError && (
						<FormError className="form-error" error={mobileError} />
					)}
				</div>
				<div className="input-wrapper">
					<Input
						{...register('password')}
						className="register-form__input"
						type="password"
						placeholder="Пароль"
					/>
					{passwordError && (
						<FormError className="form-error" error={passwordError} />
					)}
				</div>
				<div className="input-wrapper">
					<Input
						{...register('confirmPassword')}
						className="register-form__input"
						type="password"
						placeholder="Повторите пароль"
						disabled={errors?.password || !watch('password')}
					/>
					{confirPasswordError && (
						<FormError className="form-error" error={confirPasswordError} />
					)}
				</div>
			</div>
		</div>
	);
};
