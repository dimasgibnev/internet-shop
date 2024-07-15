/* eslint-disable react/prop-types */
import {  useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { MyButton, } from '../../components';
import { server } from '../../bff';
import { Link, Navigate} from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../../store/actions';
// import { selectUserRole } from '../../selectors';
// import { FormError } from '../../components';
// import { useResetForm } from '../../hooks';
import './Authorization.scss'
import { ROLE } from '../../constants';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Логин обязателен')
		.matches(/^\w+$/, 'Логин должен содержать только буквы и цифры')
		.min(3, 'Логин должен содержать минимум 3 символа')
		.max(15, 'Логин должен содержать максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d%#]*$/,
			'неверно заполненый пароль, должен содержать буквы , цифры, знаки # и %',
		)
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(30, 'Пароль должен содержать максимум 30 символов'),
});



export const Authorization= () => {
	// const dispatch = useDispatch();
	// const roleId = useSelector(selectUserRole);

	const {
		register,
		handleSubmit,
		// reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	// useResetForm(reset);

	const onSubmit = (loginAndPassword) => {
		server.authorize(loginAndPassword).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			// dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className='auth-container'>
			<h2>Авторизация</h2>
			<form  onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Логин"
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<input
					type="password"
					placeholder="Пароль"
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<MyButton height="30px" width="100%" margin="0 0 10px 0" disabled={!!formError} type="submit">
					Авторизоваться
				</MyButton>
				{errorMessage && <div className='error-message'>{errorMessage}</div>}
				<Link to={'/register'}>Регистрация</Link>
			</form>
		</div>
	);
};

