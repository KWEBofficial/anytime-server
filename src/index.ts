import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import AppDataSource from './config/dataSource';
import './config/env';
import router from './controller/router';
import errorHandler from './util/errorHandler';
import session from 'express-session';
import passport from 'passport';
import { passportConfig } from './passport';

const PORT = Number(process.env.PORT) || 3000;

const app = express();

AppDataSource.initialize().then(() => console.log('DATABASE is connected!'));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // cookie를 전달하고 싶을 때는 credential을 true로 해줘야 함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passportConfig();

app.use(
  session({
    name: 'mysession',
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    //saveUninitialize: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is started!`));
