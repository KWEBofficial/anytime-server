import { RequestHandler } from 'express';
import { ScheResDTO } from '../../type/schedule.dto';
import ScheRepository from '../../repository/schedule.repository';

export const ScheAdd: RequestHandler = (req, res, next) => {
  try {
    const ScheAdd: ScheResDTO = req.body;
  } catch (error) {
    next(err);
  }
};
