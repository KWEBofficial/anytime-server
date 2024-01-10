import { Router } from 'express';
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  isAdmin,
} from './controller';
import { isLoggedIn } from '../auth/controller';

const noticeRouter = Router();
noticeRouter.get('/:teamId', isLoggedIn, getNotices);
noticeRouter.post('/create/:teamId', isLoggedIn, isAdmin, createNotice);
noticeRouter.patch('/:noticeId', isLoggedIn, isAdmin, updateNotice);
noticeRouter.delete('/:noticeId', isLoggedIn, isAdmin, deleteNotice);

noticeRouter.get('/sche/:scheduleId', isLoggedIn, isAdmin, getNotices);
export default noticeRouter;
