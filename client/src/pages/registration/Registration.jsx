import { useNavigate } from 'react-router-dom';
import { signUp } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { FormError, Button } from '../../components';
import { FormProvider, useForm } from 'react-hook-form';
import { Inputs } from './components/Inputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../schemas/registerSchema';
import './Registration.sass';

export const Registration = () => {
	const methods = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
	const {
		formState: { errors },
		handleSubmit,
		setError,
	} = methods;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const sendData = (data) => {
		dispatch(signUp(data))
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

	const serverError = errors?.serverError?.message;
	const isError =
		serverError || (errors && Array.from(Object.values(errors)).length > 0);

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
