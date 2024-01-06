import { Router } from 'express';
import userRouter from './user/router';
import noticeRouter from './notice/router';

const router = Router();

router.use('/user', userRouter);
router.use('/notice', noticeRouter);

export default router;
//main router
