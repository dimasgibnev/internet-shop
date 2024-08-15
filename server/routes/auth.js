import express from 'express';
import { register, login } from '../controllers/user.js';

export const router = express.Router({ mergeParams: true })

router.post('/register', register);

router.post('/login', login);

router.post('/logout', (req, res) => {
	res.json();
});