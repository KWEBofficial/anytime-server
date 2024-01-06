import { Router } from 'express';
import { isLoggedIn, loginMember, registerMember, test } from './controller';

const authRouter = Router();

authRouter.post('/register', registerMember);
authRouter.post('/login', loginMember);
authRouter.get('/test', isLoggedIn, test);
//authRouter.post('/logout', logoutMember);

export default authRouter;
