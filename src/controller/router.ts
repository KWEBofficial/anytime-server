import { Router } from 'express';
import userRouter from './user/router';
import noticeRouter from './notice/router';
import authRouter from './auth/router';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello');
});
router.use('/user', userRouter);
router.use('/notice', noticeRouter);
router.use('/auth', authRouter);

export default router;
//main router
