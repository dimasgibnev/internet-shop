import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signIn } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { Input } from '../../components';
import { Button } from '../../components/button/Button';
import './Authorization.sass';

export const Authorization = () => {
	const [authData, setAuthData] = useState({
		email: '',
		password: '',
	});
	const [authDataDirty, setAuthDataDirty] = useState({
		email: false,
		password: false,
	});
	const [authDataError, setAuthDataError] = useState({
		email: 'Поле не должно быть пустым',
		password: 'Поле не должно быть пустым',
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const [serverError, setServerError] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (authDataError.email || authDataError.password || serverError) {
			setIsFormValid(false);
		} else {
			setIsFormValid(true);
		}
	}, [authDataError, serverError]);

	const emailHandler = (e) => {
		setServerError('');
		setAuthData({ ...authData, email: e.target.value });
		const regExp =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if (!regExp.test(String(e.target.value).toLowerCase())) {
			setAuthDataError((prev) => ({ ...prev, email: 'Некорректный email' }));
		} else {
			setAuthDataError((prev) => ({ ...prev, email: '' }));
		}
	};

	const passwordHandler = (e) => {
		setServerError('');
		setAuthData({ ...authData, password: e.target.value });

		if (e.target.value.length < 6) {
			setAuthDataError((prev) => ({
				...prev,
				password: 'Минимальная длина пароля 6 символов',
			}));
			if (!e.target.value) {
				setAuthDataError((prev) => ({
					...prev,
					password: 'Поле не должно быть пустым',
				}));
			}
		} else {
			setAuthDataError((prev) => ({ ...prev, password: '' }));
		}
	};
	const blurHandler = (e) => {
		switch (e.target.name) {
			case 'email':
				setAuthDataDirty((prev) => ({ ...prev, email: true }));
				break;
			case 'password':
				setAuthDataDirty((prev) => ({ ...prev, password: true }));
				break;
			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signIn(authData))
			.unwrap()
			.then(({ response }) => {
				if (response) {
					setServerError(response?.data?.message);
				} else {
					navigate('/');
				}
				setAuthData({ email: '', password: '' });
			});
	};

	return (
		<div className="auth">
			<h2 className="auth__title">АВТОРИЗАЦИЯ</h2>

			<div className="auth__form-wrapper">
				<form onSubmit={handleSubmit} className="form">
					<Input
						value={authData.email}
						onChange={emailHandler}
						onBlur={(e) => blurHandler(e)}
						className="form__input"
						name="email"
						type="email"
						placeholder="введите почту"
					/>
					{authDataError.email && authDataDirty.email && (
						<span className="form__error">{authDataError.email}</span>
					)}
					<Input
						value={authData.password}
						onChange={passwordHandler}
						onBlur={(e) => blurHandler(e)}
						className="form__input"
						name="password"
						type="password"
						placeholder="введите пароль"
					/>
					{authDataError.password && authDataDirty.password && (
						<span className="form__error">{authDataError.password}</span>
					)}
					<Button
						disabled={!isFormValid}
						type="submit"
						className="form__button"
					>
						ВОЙТИ
					</Button>
					{serverError && <span className="form__error">{serverError}</span>}
					<span className="form__text">нет аккаунта?</span>
					<Link to={'/register'} className="form__link">
						ЗАРЕГИСТРИРОВАТЬСЯ
					</Link>
				</form>
			</div>
		</div>
	);
};
