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

scheRouter.post('/create', isLoggedIn, ScheAdd);
scheRouter.post('/create/:teamId', isLoggedIn, TeamScheAdd);
scheRouter.get('/', isLoggedIn, AllScheSearch);
scheRouter.get('/:scheduleId', isLoggedIn, OneScheSearch);
scheRouter.patch('/:scheduleId', isLoggedIn, ScheEdit);
scheRouter.delete('/:scheduleId', isLoggedIn, ScheDelete);
scheRouter.get('/team/:teamId', isLoggedIn, TeamMemScheSearch);

export default scheRouter;
