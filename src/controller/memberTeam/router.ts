import { Router } from 'express';
import {
  toggleFavoriteTeam,
  toggleHideTeam,
  inviteMember,
  toggleAdmin,
  subsTeam,
  unsubsTeam,
} from './controller';

const teamRouter = Router();

teamRouter.patch('/favorite/:teamId', toggleFavoriteTeam);
teamRouter.patch('/hide/:teamId', toggleHideTeam);

teamRouter.post('/member', inviteMember);
teamRouter.patch('/admin', toggleAdmin);

teamRouter.post('/subscribe/:teamId', subsTeam);
teamRouter.delete('/subscribe/:teamId', unsubsTeam);

export default teamRouter;
