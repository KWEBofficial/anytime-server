import { Router } from 'express';
import userRouter from './user/router';
import alarmRouter from './alarm/router';

const router = Router();

router.use('/user', userRouter);
router.use('/alarm', alarmRouter);

export default router;
//main router
