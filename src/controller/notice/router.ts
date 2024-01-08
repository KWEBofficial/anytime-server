import { Router } from 'express';
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from './controller';
import { isLoggedIn } from '../auth/controller';

const noticeRouter = Router();
noticeRouter.get('/:teamId', isLoggedIn, getNotices);
noticeRouter.post('/create/:teamId', isLoggedIn, createNotice);
noticeRouter.patch('/:noticeId', isLoggedIn, updateNotice);
noticeRouter.delete('/:noticeId', isLoggedIn, deleteNotice);

export default noticeRouter;
