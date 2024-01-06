import { Router } from 'express';
import userRouter from './user/router';
import teamRouter from './team/router';
import authRouter from './auth/router';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello');
});
router.use('/user', userRouter);
router.use('/team', teamRouter);
router.use('/auth', authRouter);

export default router;
//main router
