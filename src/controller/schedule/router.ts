import { Router } from 'express';
import { isLoggedIn } from '../auth/controller';
import {
  ScheAdd,
  TeamScheAdd,
  AllScheSearch,
  OneScheSearch,
  ScheEdit,
  ScheDelete,
  TeamMemScheSearch,
  isRelated,
} from './controller';
import { isAdmin } from '../notice/controller';

const scheRouter = Router();

scheRouter.post('/create', isLoggedIn, ScheAdd);
scheRouter.post('/create/:teamId', isLoggedIn, isAdmin, TeamScheAdd);
scheRouter.get('/', isLoggedIn, AllScheSearch);
scheRouter.get('/:scheduleId', isLoggedIn, isRelated, OneScheSearch);
scheRouter.patch('/:scheduleId', isLoggedIn, isRelated, isAdmin, ScheEdit);
scheRouter.delete('/:scheduleId', isLoggedIn, isRelated, isAdmin, ScheDelete);
scheRouter.get('/team/:teamId', isLoggedIn, isAdmin, TeamMemScheSearch);

export default scheRouter;
