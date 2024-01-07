import passport from 'passport';
import MemberRepository from '../repository/member.repository';
import Member from '../entity/member.entity';
import bcrypt from 'bcrypt';

import LocalStrategy from 'passport-local';

export const passportConfig = () => {
  // 로그인시 실행되며, req.session에 데이터를 저장 즉, 사용자 정보를 세션에 아이디로 저장함.
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // 매 요청시 실행됨. 즉, 세션에 저장한 아이디를 통해 사용자 정보를 불러옴.
  passport.deserializeUser((user: Member, done) => {
    MemberRepository.findOne({ where: { email: user.email } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  passport.use(
    new LocalStrategy.Strategy(
      {
        // local 전략을 세움
        usernameField: 'email',
        passwordField: 'password',
        session: true, // 세션에 저장 여부
        passReqToCallback: false,
      },
      async (email, password, done) => {
        const member = await MemberRepository.findOne({ where: { email } });
        if (!member) {
          return done(null, false, {
            message: '존재하지 않는 아이디입니다.',
          });
        }
        if (await bcrypt.compare(password, member.password)) {
          return done(null, member);
        } else {
          return done(null, false, { message: '비밀번호가 틀렸습니다.' });
        }
      },
    ),
  );
};
