import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const initialValues = {
	firstName: 'Дмитрий',
	lastName: 'Сгибнев',
	email: 'dima@mail.ru',
	mobile: '89542322244',
	password: '123qwe',
	confirmPassword: '123qwe',
};

const registerSchema = yup.object().shape({
	firstName: yup
		.string()
		.required('Обязательное поле')
		.matches(/[a-zA-Zа-яёА-ЯЁ]/, 'Имя должно содержать буквы'),
	lastName: yup
		.string()
		.required('Обязательное поле')
		.matches(/[a-zA-Zа-яёА-ЯЁ]/, 'Фамилия должна содержать буквы'),
	email: yup.string().email('Неверный email').required('Обязательное поле'),
	mobile: yup
		.string()
		.required('Обязательное поле')
		.matches(
			/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
			'Введите корректный номер телефона',
		),
	password: yup
		.string()
		.required('Обязательное поле')
		.min(6, 'Минимальная длина 6 символов'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
		.required('Обязательное поле'),
});

export const useRegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initialValues,
		resolver: yupResolver(registerSchema),
	});

	return {
		register,
		handleSubmit,
		errors,
	};
};
