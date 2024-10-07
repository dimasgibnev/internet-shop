import * as yup from 'yup';

export const schema = yup.object().shape({
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
			'Некорректный номер телефона',
		),
	password: yup
		.string()
		.required('Это поле обязательно')
		.min(6, 'Пароль должен быть минимум 6 символов'),
	confirmPassword: yup
		.string()
		.required('Это поле обязательно')
		.oneOf([yup.ref('password'), null], 'Пароль должен совпадать'),
});
