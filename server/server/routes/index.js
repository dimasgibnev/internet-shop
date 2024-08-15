import express from 'express';
import { router as auth } from './auth.js';
import { router as post } from './post.js';
import { router as user } from './user.js';

export const router = express.Router({ mergeParams: true });

router.use('/', auth);
router.use('/posts', post);
router.use('/users', user);
