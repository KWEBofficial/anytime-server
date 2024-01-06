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
export const loginMember: RequestHandler = async (req, res) => {
  await passport.authenticate(
    'local',
    (err: string, user: Express.User, options: { message: string }) => {
      if (user) {
        // If the user exists log him in:
        req.login(user, (error) => {
          if (error) {
            console.log(options.message);
            return res.status(400).json();
          } else {
            console.log('Successfully authenticated');
            // HANDLE SUCCESSFUL LOGIN
            // e.g. res.redirect("/home")
            return res.status(200).json();
          }
        });
      } else {
        console.log(options.message);
        return res.status(400).json();
        // HANDLE FAILURE LOGGING IN
        // e.g. res.redirect("/login"))
        // or
        // res.render("/login", { message: options.message || "custom message" })
      }
    },
  )(req, res);
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

export const test: RequestHandler = (req, res) => {
  console.log(req.user);
  return res.status(200).json();
};
