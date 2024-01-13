import { Router } from 'express';
import userRouter from './user/router';
import teamRouter from './team/router';
import noticeRouter from './notice/router';
import authRouter from './auth/router';
import scheRouter from './schedule/router';
import memberRouter from './member/router';
import alarmRouter from './alarm/router';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello');
});
router.use('/user', userRouter);
router.use('/team', teamRouter);
router.use('/notice', noticeRouter);
router.use('/auth', authRouter);
router.use('/schedule', scheRouter);
router.use('/member', memberRouter);
router.use('/alarm', alarmRouter);

export default router;
//main router
