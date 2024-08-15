import bcrypt from 'bcrypt';
import { UserModel } from '../models/User.js';
import { mapUser } from '../helpers/mapUser.js';
import { generate } from '../helpers/token.js';
import * as ROLES from '../constants/roles.js';

export async function register(req, res) {
	try {
		const { login, password } = req.body;
		
		if (!login) {
			throw new Error('Login is required');
		}

		if (!password) {
			throw new Error('Password is required');
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await UserModel.create({ login, password: hashedPassword });

		const token = generate({ _id: user.id });

		

		res.send({ user: mapUser(user), token, error: null });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(400).json({
				message: 'Такой пользователь уже существует',
			});
		}
		console.log(error);
		res.status(500).json({
			message: 'Не удалось зарегистрироваться, попробуйте снова',
		});
	}
}

export async function login(req, res) {
	try {
		const { login, password } = req.body;

		const user = await UserModel.findOne({ login });

		if (!user) {
			throw new Error('Логин или пароль неверны');
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new Error('Логин или пароль неверны');
		}

		const token = generate({ _id: user.id });

		res.send({ user: mapUser(user), token, error: null });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось войти, попробуйте снова',
		});
	}
}

export const getUsers = async () => {
	const users = await UserModel.find();

	return users
};

export const getMe = async (id) => {
	const user = await UserModel.findById(id);

	return user
};

export const getRoles = async () => {
	const roles = [
		{ id: ROLES.ADMIN, name: 'admin' },
		{ id: ROLES.MODERATOR, name: 'moderator' },
		{ id: ROLES.READER, name: 'reader' },
		{ id: ROLES.GUEST, name: 'guest' },
	];

	return roles;
};

export const deleteUser = async (id) => {

	await UserModel.findByIdAndDelete(id);

};

export const editUserRole = async (id, {role}) => {
	const updatedUser = await UserModel.findByIdAndUpdate(
		id,
		{  role },
		{
			returnDocument: 'after',
		},
	);

	return updatedUser;
};
