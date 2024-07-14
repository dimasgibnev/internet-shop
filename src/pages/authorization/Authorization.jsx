import { Link } from 'react-router-dom';
import { MyButton } from '../../components';

export const Authorization = () => {
	return (
		<div>
			<h2>Авторизация</h2>
			<form>
				<input type="text" placeholder="Логин" />
				<input type="password" placeholder="Пароль" />
				<MyButton margin="0 0 10px 0" type="submit">
					Авторизоваться
				</MyButton>
				{/* {errorMessage && <FormError>{errorMessage}</FormError>} */}
				<Link to={'/register'}>Регистрация</Link>
			</form>
		</div>
	);
};
