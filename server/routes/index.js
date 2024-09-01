import express from 'express';
import { router as auth } from './auth.js';
import { router as products } from './product.js';
import { router as user } from './user.js';
import { router as category } from './category.js';
import { router as line } from './line.js';
import { router as cart } from './cart.js';

export const router = express.Router({ mergeParams: true });

router.use('/', auth);
router.use('/products', products);
router.use('/users', user);
router.use('/categories', category);
router.use('/lines', line);
router.use('/cart', cart);