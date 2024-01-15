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

import {} from '../auth/controller';

const teamRouter = Router();

teamRouter.patch('/favorite/:teamId', toggleFavoriteTeam);
teamRouter.patch('/hide/:teamId', toggleHideTeam);

teamRouter.post('/member', inviteMember);
teamRouter.patch('/admin', toggleAdmin);

teamRouter.post('/subscribe/:teamId', subsTeam);
teamRouter.delete('/subscribe/:teamId', unsubsTeam);

teamRouter.post('/create', createTeam); // body를 사용하여 team 정보 저장
teamRouter.get('/', myTeam); // userId에 맞는 team 정보 가져오기
teamRouter.get('/search', searchTeam); // query를 사용하여 team 정보 가져오기
teamRouter.patch('/:teamId', updateTeam); // param와 body를 사용하여 해당하는 team 정보 수정
//teamRouter.get('/team/:teamId', showTeam); // param을 사용하여 해당하는 team 정보 가져오기
teamRouter.delete('/:teamId', deleteTeam); // param을 사용하여 해당하는 team 정보 삭제

export default teamRouter;
