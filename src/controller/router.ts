import { Router } from 'express';
import userRouter from './user/router';
import authRouter from './auth/router';
import scheRouter from './schedule/router';
import memberRouter from './member/router';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello');
});
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/schedule', scheRouter);
router.use('/member', memberRouter);

export default router;
//main router
