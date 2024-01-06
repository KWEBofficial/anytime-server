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

app.use(cors({ origin: process.env.CLIENT_URL, credentials: false })); // cookie를 전달하고 싶을 때는 credential을 true로 해줘야 함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passportConfig();

app.use(
  session({
    name: 'mysession', // 쿠키에 저장될 세션키 이름
    secret: process.env.SESSION_SECRET as string, // 세션 암호화를 위한 시크릿
    resave: true, // 옵션 참고
    //saveUninitialize: true, // 옵션 참고
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is started!`));
