import express from 'express';
import { router as auth } from './auth.js';
import { router as products } from './product.js';
import { router as user } from './user.js';

export const router = express.Router({ mergeParams: true });

router.use('/', auth);
router.use('/products', products);
router.use('/users', user);
