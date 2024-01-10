import { Router } from 'express';
import userRouter from './user/router';
import authRouter from './auth/router';
import scheRouter from './schedule/router';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello');
});
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/schedule', scheRouter);

export default router;
//main router
