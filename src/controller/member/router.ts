import { Router } from 'express';
import { getMemberById, searchMember } from './controller';
import { isLoggedIn } from '../auth/controller';

const memberRouter = Router();

memberRouter.get('/:memberId', isLoggedIn, getMemberById);
memberRouter.get('/search/:email', isLoggedIn, searchMember);

export default memberRouter;
