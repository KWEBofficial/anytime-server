import { RequestHandler } from 'express';
import { MemberRegisterReqDTO } from '../../type/member.dto';
import passport from 'passport';
import bcrypt from 'bcrypt';
import MemberService from '../../service/member.service';

export const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다');
  }
};

export const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('이미 로그인 됨');
  }
};

export const loginMember: RequestHandler = async (req, res) => {
  await passport.authenticate(
    'local',
    (err: string, user: Express.User, options: { message: string }) => {
      if (user) {
        req.login(user, (error) => {
          if (error) {
            console.log(options.message);
            return res.status(400).json();
          } else {
            console.log('Successfully authenticated');
            return res.status(200).json();
          }
        });
      } else {
        console.log(options.message);
        return res.status(400).json();
      }
    },
  )(req, res);
};

export const logoutMember: RequestHandler = async (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(400).json();
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
    if (uniqueFind)
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
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
