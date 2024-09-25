import * as yup from 'yup';

export const schema = yup.object().shape({
	email: yup
		.string()
		.email('Введите корректный email')
		.required('Это поле обязательно'),
	password: yup
		.string()
		.required('Это поле обязательно')
		.min(6, 'Пароль должен быть минимум 6 символов'),
});
