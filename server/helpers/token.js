import jwt from 'jsonwebtoken';

const sign = 'secret123';

export const generate = (data) => {
	return jwt.sign(data, sign, { expiresIn: '30d' });
};

export const verify = (token) => {
	return jwt.verify(token, sign);
};
