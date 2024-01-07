import { Router } from 'express';
import { getAlarm, deleteAlarm, readAlarm } from './controller';

const alarmRouter = Router();

alarmRouter.get('/', getAlarm);
alarmRouter.delete('/:alarmId', deleteAlarm);
alarmRouter.patch('/:alarmId', readAlarm);

export default alarmRouter;
