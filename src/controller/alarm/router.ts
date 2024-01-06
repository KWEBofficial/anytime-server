import { Router } from 'express';
import { getAlarm, deleteAlarm, readAlarm } from './controller';

const alarmRouter = Router();

alarmRouter.get('/', getAlarm);
alarmRouter.delete('alarm/:alarmId', deleteAlarm);
alarmRouter.patch('alarm/:alarmId', readAlarm);

export default alarmRouter;
