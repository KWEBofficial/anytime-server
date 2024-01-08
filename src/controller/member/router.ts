import { Router } from 'express';
import { searchMember } from './controller';
import { isLoggedIn } from '../auth/controller';

const memberRouter = Router();

memberRouter.get('/search', isLoggedIn, searchMember);

export default memberRouter;
