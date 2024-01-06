import { RequestHandler } from 'express';
import { MemberRegisterReqDTO } from '../../type/member.dto';
//import MemberService from '../../service/member.service';
import passport from 'passport';
import MemberRepository from '../../repository/member.repository';
import bcrypt from 'bcrypt';

export const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('needs login');
  }
};

export const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('이미 로그인 됨');
  }
};

export const loginMember: RequestHandler = async (req, res, next) => {
  const callbackFunc: passport.AuthenticateCallback = (
    authError,
    user,
    info,
  ) => {
    if (authError) {
      console.error(authError);
      res.status(500);
      return next(authError);
    }
    if (!user) {
      res.status(500);
      return res.send(info);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        res.status(500);
        return next(loginError);
      }
      return res.send(user);
    });
  };
  passport.authenticate('local', callbackFunc)(req, res, next);
};

export const registerMember: RequestHandler = async (req, res, next) => {
  try {
    const memberRegisterReqDTO: MemberRegisterReqDTO = req.body;
    const uniqueFind = await MemberRepository.findOne({
      where: { email: memberRegisterReqDTO.email },
    });
    if (uniqueFind) return res.status(400);

    console.log('no user');
    const hash = await bcrypt.hash(memberRegisterReqDTO.password, 1);
    console.log(hash);
    console.log(hash.toString);
    const member = await MemberRepository.save({
      email: memberRegisterReqDTO.email,
      membername: memberRegisterReqDTO.membername,
      password: hash,
    });
    console.log(member.id);
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
