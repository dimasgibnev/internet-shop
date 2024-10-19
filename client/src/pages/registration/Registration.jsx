import { Navigate, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsAuth } from '../../store/slices/userSlice';
import { signUp } from '../../store/slices/authSlice';
import { registerSchema } from '../../data/shema';

import { FormError, Button } from '../../components/ui';
import { Inputs } from './components/Inputs';

import './Registration.sass';

export const Registration = () => {
	const isAuth = useSelector(selectIsAuth);
	const methods = useForm({ resolver: yupResolver(registerSchema), mode: 'onChange' });
	const {
		formState: { errors },
		handleSubmit,
		setError,
	} = methods;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const error = useSelector((state) => state.auth?.error);

	const sendData = (data) => {
		dispatch(signUp(data))
			.unwrap()
			.then(() => {
				navigate('/');
			})
			.catch((e) => {
				setError(error);
			});
	};

	const serverError = errors?.serverError?.message || error;
	const isError =
		serverError || (errors && Array.from(Object.values(errors)).length > 0);

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<FormProvider {...methods}>
			<div className="register">
				<div className="register__form-wrapper">
					<h2 className="register__title">РЕГИСТРАЦИЯ</h2>
					<form onSubmit={handleSubmit(sendData)} className="register-form">
						<Inputs />
						<Button
							disabled={isError}
							type="submit"
							className="register-form__button"
						>
							ЗАРЕГИСТРИРОВАТЬСЯ
						</Button>
						<FormError className="server-error" error={serverError} />
					</form>
				</div>
			</div>
		</FormProvider>
	);
};
