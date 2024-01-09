import { Router } from 'express';
import userRouter from './user/router';
import teamRouter from './team/router';
import authRouter from './auth/router';
import memberRouter from './member/router';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello');
});
router.use('/user', userRouter);
router.use('/team', teamRouter);
router.use('/auth', authRouter);
router.use('/member', memberRouter);

export default router;
//main router
