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
} from './controller';

const scheRouter = Router();

scheRouter.post('/schedule/create', isLoggedIn, ScheAdd);
scheRouter.post('/schedule/create/:teamId', isLoggedIn, TeamScheAdd);
scheRouter.get('/schedule', isLoggedIn, AllScheSearch);
scheRouter.get('/schedule/:scheduleId', isLoggedIn, OneScheSearch);
scheRouter.patch('/schedule/:scheduleId', isLoggedIn, ScheEdit);
scheRouter.delete('/schedule/:scheduleId', isLoggedIn, ScheDelete);
scheRouter.get('/schedule/team/:teamId', isLoggedIn, TeamMemScheSearch);

export default scheRouter;
