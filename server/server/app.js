import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import { router as routes } from './routes/index.js';

const port = 3001;

const app = express();

app.use(express.static('../client/build'))
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', routes);

mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => {
		app.listen(port, (e) => {
			if (e) {
				console.error(e, 'Ошибка сервера');
			}
			console.log(`server started at http://localhost:${port}`);
		});
	})
	.catch((err) => console.log(err, 'db connection error'));
