import { Router } from 'express';
import userRouter from './user/router';
import teamRouter from './team/router';

const router = Router();

router.use('/user', userRouter);
router.use('/team', teamRouter);

export default router;
//main router
