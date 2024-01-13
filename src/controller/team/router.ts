import { Router } from 'express';
import {
  createTeam,
  myTeam,
  searchTeam,
  updateTeam,
  //showTeam,
  deleteTeam,
} from './controller';
import {
  toggleFavoriteTeam,
  toggleHideTeam,
  inviteMember,
  toggleAdmin,
  subsTeam,
  unsubsTeam,
} from '../memberTeam/controller';

import { isLoggedIn } from '../auth/controller';

const teamRouter = Router();

teamRouter.patch('/favorite/:teamId', isLoggedIn, toggleFavoriteTeam);
teamRouter.patch('/hide/:teamId', isLoggedIn, toggleHideTeam);

teamRouter.post('/member', isLoggedIn, inviteMember);
teamRouter.patch('/admin', isLoggedIn, toggleAdmin);

teamRouter.post('/subscribe/:teamId', isLoggedIn, subsTeam);
teamRouter.delete('/subscribe/:teamId', isLoggedIn, unsubsTeam);

teamRouter.post('/create', isLoggedIn, createTeam); // body를 사용하여 team 정보 저장
teamRouter.get('/', isLoggedIn, myTeam); // userId에 맞는 team 정보 가져오기
teamRouter.get('/search', isLoggedIn, searchTeam); // query를 사용하여 team 정보 가져오기
teamRouter.patch('/:teamId', isLoggedIn, updateTeam); // param와 body를 사용하여 해당하는 team 정보 수정
//teamRouter.get('/team/:teamId', isLoggedIn, showTeam); // param을 사용하여 해당하는 team 정보 가져오기
teamRouter.delete('/:teamId', isLoggedIn, deleteTeam); // param을 사용하여 해당하는 team 정보 삭제

export default teamRouter;
