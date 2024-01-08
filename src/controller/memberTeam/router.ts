import { Router } from 'express';
import {
  toggleFavoriteTeam,
  toggleHideTeam,
  inviteMember,
  toggleAdmin,
  subsTeam,
  unsubsTeam,
} from './controller';
import { isLoggedIn } from '../auth/controller';

const teamRouter = Router();

teamRouter.patch('/favorite/:teamId', isLoggedIn, toggleFavoriteTeam);
teamRouter.patch('/hide/:teamId', isLoggedIn, toggleHideTeam);

teamRouter.post('/member', isLoggedIn, inviteMember);
teamRouter.patch('/admin', isLoggedIn, toggleAdmin);

teamRouter.post('/subscribe/:teamId', isLoggedIn, subsTeam);
teamRouter.delete('/subscribe/:teamId', isLoggedIn, unsubsTeam);

export default teamRouter;
