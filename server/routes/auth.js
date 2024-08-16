import express from 'express';
import { register, login, logout } from '../controllers/user.js';

export const router = express.Router({ mergeParams: true })

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);