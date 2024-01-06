import { Router } from 'express';
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from './controller';
const noticeRouter = Router();

noticeRouter.get('/:teamId', getNotices);
noticeRouter.post('/create/:teamId', createNotice);
noticeRouter.patch('/:noticeId', updateNotice);
noticeRouter.delete('/:noticeId', deleteNotice);

export default noticeRouter;
