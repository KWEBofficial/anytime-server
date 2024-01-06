import { Router } from 'express';
import passport from 'passport';
import { registerMember } from './controller';

const authRouter = Router();

authRouter.post('/register', registerMember);
authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);
//authRouter.post('/logout', logoutMember);

export default authRouter;
