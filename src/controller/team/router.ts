import { Router } from 'express';
import {
  createTeam,
  myTeam,
  searchTeam,
  updateTeam,
  //showTeam,
  deleteTeam,
} from './controller';

const teamRouter = Router();

teamRouter.post('/create', createTeam); // body를 사용하여 team 정보 저장
teamRouter.get('/team', myTeam); // userId에 맞는 team 정보 가져오기
teamRouter.get('/search', searchTeam); // query를 사용하여 team 정보 가져오기
teamRouter.patch('/:teamId', updateTeam); // param와 body를 사용하여 해당하는 team 정보 수정
//teamRouter.get('/team/:teamId', showTeam); // param을 사용하여 해당하는 team 정보 가져오기
teamRouter.delete('/:teamId', deleteTeam); // param을 사용하여 해당하는 team 정보 삭제

export default teamRouter;
