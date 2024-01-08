import { Router } from 'express';
import { getAlarm, deleteAlarm, readAlarm, restoreAlarm } from './controller';

const alarmRouter = Router();

alarmRouter.get('/', getAlarm);
alarmRouter.delete('/:alarmId', deleteAlarm);
alarmRouter.patch('/:alarmId', readAlarm);

// only for test
alarmRouter.patch('/test/:alarmId', restoreAlarm);

export default alarmRouter;
