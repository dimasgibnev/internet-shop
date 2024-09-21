import { useNavigate } from 'react-router-dom';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import { signUp } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Input } from '../../components';
import './Registration.sass';
import { Button } from '../../components/button/Button';

export const Registration = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const { register, handleSubmit, errors } = useRegisterForm();

	const sendData = (data) => {
		dispatch(signUp(data))
			.unwrap()
			.catch((e) => {
				console.log(e);
				setError(e);
			});
	};

	const isError = error || Array.from(Object.values(errors)).length > 0;

	return (
		<div className="register">
			<h2 className="auth__title">РЕГИСТРАЦИЯ</h2>

			<div className="register__form-wrapper">
				<form onSubmit={handleSubmit(sendData)} className="register-form">
					<div className="inputs-wrapper">
						<div className="register-form__inputs">
							<div className="input-wrapper">
								<Input
									{...register('firstName')}
									className="register-form__input"
									type="text"
									placeholder="Имя"
								/>
								{errors.firstName?.message && (
									<span className="register-form__error">
										{errors.firstName?.message}
									</span>
								)}
							</div>

							<div className="input-wrapper">
								<Input
									{...register('lastName')}
									className="register-form__input"
									type="text"
									placeholder="Фамилия"
								/>
								{errors.lastName?.message && (
									<span className="register-form__error">
										{errors.lastName?.message}
									</span>
								)}
							</div>

							<div className="input-wrapper">
								<Input
									{...register('email')}
									className="register-form__input"
									type="email"
									placeholder="Почта"
									onChange={() => setError('')}
								/>
								{errors.email?.message && (
									<span className="register-form__error">
										{errors.email?.message}
									</span>
								)}
							</div>
						</div>

						<div className="register-form__inputs">
							<div className="input-wrapper">
								<Input
									{...register('mobile')}
									className="register-form__input"
									type="phone"
									placeholder="Мобильный телефон"
									onChange={() => setError('')}
								/>
								{errors.mobile?.message && (
									<span className="register-form__error">
										{errors.mobile?.message}
									</span>
								)}
							</div>
							<div className="input-wrapper">
								<Input
									{...register('password')}
									className="register-form__input"
									type="password"
									placeholder="Пароль"
								/>
								{errors.password?.message && (
									<span className="register-form__error">
										{errors.password?.message}
									</span>
								)}
							</div>
							<div className="input-wrapper">
								<Input
									{...register('confirmPassword')}
									className="register-form__input"
									type="password"
									placeholder="Повторите пароль"
								/>
								{errors.confirmPassword?.message && (
									<span className="register-form__error">
										{errors.confirmPassword?.message}
									</span>
								)}
							</div>
						</div>
					</div>
					<Button
						disabled={isError}
						type="submit"
						className="register-form__button"
					>
						ЗАРЕГИСТРИРОВАТЬСЯ
					</Button>
					<span className="register-form__error-submit">{error}</span>
				</form>
			</div>
		</div>
	);
};
