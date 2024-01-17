import { Router } from 'express';
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  isAdmin,
  getAllNotices,
} from './controller';
import { isLoggedIn } from '../auth/controller';

const noticeRouter = Router();
noticeRouter.get('/all/:teamId', isLoggedIn, isAdmin, getAllNotices);
noticeRouter.get('/:teamId', isLoggedIn, getNotices);
noticeRouter.post('/create/:teamId', isLoggedIn, isAdmin, createNotice);
noticeRouter.patch('/:noticeId', isLoggedIn, isAdmin, updateNotice);
noticeRouter.delete('/:noticeId', isLoggedIn, isAdmin, deleteNotice);

export default noticeRouter;
