import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { loginSchema } from '../../data/shema';
import { signIn } from '../../store/slices/authSlice';
import { selectIsAuth } from '../../store/slices/userSlice';

import { FormError, Button } from '../../components/ui';
import { Inputs } from './components/Inputs';

import './Authorization.sass';

export const Authorization = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector(selectIsAuth);
	const methods = useForm({ resolver: yupResolver(loginSchema), mode: 'onChange' });
	const {
		formState: { errors },
		setError,
		handleSubmit,
	} = methods;
	const error = useSelector((state) => state.auth?.error);
	const serverError = errors?.serverError?.message || error;

	const sendData = (authData) => {
		dispatch(signIn(authData))
			.unwrap()
			.then(() => {
				navigate('/');
			})
			.catch((e) => {
				setError(error);
			});
	};

	const isError =
		serverError || (errors && Array.from(Object.values(errors)).length > 0);

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<FormProvider {...methods}>
			<div className="auth">
				<div className="auth__form-wrapper">
					<h2 className="auth__title">АВТОРИЗАЦИЯ</h2>
					<form onSubmit={handleSubmit(sendData)} className="form">
						<Inputs />
						<Button disabled={isError} type="submit" className="form__button">
							ВОЙТИ
						</Button>
						{serverError && (
							<FormError error={serverError} className="server-error" />
						)}
						<span className="form__text">нет аккаунта?</span>
						<Link to={'/register'} className="form__link">
							ЗАРЕГИСТРИРОВАТЬСЯ
						</Link>
					</form>
				</div>
			</div>
		</FormProvider>
	);
};
