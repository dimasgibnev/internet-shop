import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { FormError } from '../../components';
import { Button } from '../../components/button/Button';
import { Inputs } from './components/Inputs';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../schemas/authSchema';
import './Authorization.sass';

export const Authorization = () => {
	const methods = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		formState: { errors },
		handleSubmit,
		setError,
	} = methods;
	const serverError = errors?.serverError?.message;

	const sendData = (authData) => {
		dispatch(signIn(authData))
			.unwrap()
			.then(() => {
				navigate('/');
			})
			.catch((e) => {
				setError('serverError', {
					message: e.message,
				});
			});
	};

	const isError =
		serverError || (errors && Array.from(Object.values(errors)).length > 0);

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
