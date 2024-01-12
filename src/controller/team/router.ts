import { Router } from 'express';
import {
  createTeam,
  myTeam,
  searchTeam,
  updateTeam,
  showTeam,
  deleteTeam,
} from './controller';
import { isLoggedIn } from '../auth/controller';

const teamRouter = Router();

teamRouter.post('/create', isLoggedIn, createTeam); // body를 사용하여 team 정보 저장
teamRouter.get('/', isLoggedIn, myTeam); // userId에 맞는 team 정보 가져오기
teamRouter.get('/search', isLoggedIn, searchTeam); // query를 사용하여 team 정보 가져오기
teamRouter.patch('/:teamId', isLoggedIn, updateTeam); // param와 body를 사용하여 해당하는 team 정보 수정
teamRouter.get('/:teamId', isLoggedIn, showTeam); // param을 사용하여 해당하는 team 정보 가져오기
teamRouter.delete('/:teamId', isLoggedIn, deleteTeam); // param을 사용하여 해당하는 team 정보 삭제

export default teamRouter;
