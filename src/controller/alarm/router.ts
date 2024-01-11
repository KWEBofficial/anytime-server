import { Router } from 'express';
import { getAlarm, deleteAlarm, readAlarm, restoreAlarm } from './controller';
import { isLoggedIn } from '../auth/controller';

const alarmRouter = Router();

alarmRouter.get('/', isLoggedIn, getAlarm);
alarmRouter.delete('/:alarmId', isLoggedIn, deleteAlarm);
alarmRouter.patch('/:alarmId', isLoggedIn, readAlarm);

// only for test
alarmRouter.patch('/test/:alarmId', isLoggedIn, restoreAlarm);

export default alarmRouter;
