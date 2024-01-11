import { Router } from 'express';
import {
  isLoggedIn,
  loginMember,
  logoutMember,
  registerMember,
  test,
} from './controller';

const authRouter = Router();

authRouter.post('/register', registerMember);
authRouter.post('/login', loginMember);
authRouter.post('/logout', isLoggedIn, logoutMember);
authRouter.get('/test', isLoggedIn, test);

export default authRouter;
