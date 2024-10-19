import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email('Введите корректный email')
		.required('Это поле обязательно'),
	password: yup
		.string()
		.required('Это поле обязательно')
		.min(6, 'Пароль должен быть минимум 6 символов'),
	serverError: yup.string(),
});

export const registerSchema = yup.object().shape({
	firstName: yup
		.string()
		.required('Это поле обязательно')
		.matches(/^[а-яёА-ЯЁ]*$/, 'Имя должно содержать только буквы'),
	lastName: yup
		.string()
		.required('Это поле обязательно')
		.matches(/^[а-яёА-ЯЁ]*$/, 'Фамилия должна содержать только буквы'),
	email: yup
		.string()
		.email('Введите корректный email')
		.required('Это поле обязательно'),
	mobile: yup
		.string()
		.required('Это поле обязательно')
		.matches(
			/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
			'Номер телефона должен начинаться с 8 или +7',
		),
	password: yup
		.string()
		.required('Это поле обязательно')
		.min(6, 'Пароль должен быть минимум 6 символов'),
	confirmPassword: yup
		.string()
		.required('Это поле обязательно')
		.oneOf([yup.ref('password'), ''], 'Пароль должен совпадать'),
	serverError: yup.string(),
});
