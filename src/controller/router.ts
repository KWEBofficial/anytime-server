import { Router } from 'express';
import userRouter from './user/router';
import authRouter from './auth/router';
import teamMemberRouter from './team/router';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello');
});
router.use('/user', userRouter);
router.use('/auth', authRouter);

router.use('/team', teamMemberRouter);

export default router;
//main router
