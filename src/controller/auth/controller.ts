import { RequestHandler } from 'express';
import { MemberRegisterReqDTO } from '../../type/member.dto';
import passport from 'passport';
import bcrypt from 'bcrypt';
import MemberService from '../../service/member.service';
import { BadRequestError, UnauthorizedError } from '../../util/customErrors';

export const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new UnauthorizedError('로그인이 필요합니다.');
  }
};

export const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    throw new UnauthorizedError('이미 로그인 되었습니다.');
  }
};

export const loginMember: RequestHandler = async (req, res, next) => {
  await passport.authenticate(
    'local',
    (err: string, user: Express.User, options: { message: string }) => {
      try {
        if (user) {
          req.login(user, (error) => {
            if (error) {
              throw new BadRequestError(options.message);
            } else {
              console.log('로그인 되었습니다.');
              return res.status(200).json();
            }
          });
        } else {
          throw new BadRequestError(options.message);
        }
      } catch (error) {
        next(error);
      }
    },
  )(req, res, next);
};

export const logoutMember: RequestHandler = async (req, res) => {
  req.logout((error) => {
    if (error) {
      throw new BadRequestError('잘못된 요청입니다.');
    } else {
      return res.status(200).json({ message: '로그아웃 완료' });
    }
  });
};

export const registerMember: RequestHandler = async (req, res, next) => {
  try {
    const memberRegisterReqDTO: MemberRegisterReqDTO = req.body;
    const uniqueFind = await MemberService.getMemberByEmail(
      memberRegisterReqDTO.email,
    );
    if (uniqueFind) throw new BadRequestError('이미 존재하는 이메일입니다.');

    const hash = await bcrypt.hash(memberRegisterReqDTO.password, 1);
    MemberService.saveMember(
      memberRegisterReqDTO.email,
      memberRegisterReqDTO.membername,
      hash,
    );
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const test: RequestHandler = (req, res) => {
  console.log(req.session.passport?.user);
  return res.status(200).json();
};
