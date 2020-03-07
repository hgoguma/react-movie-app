const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models/User');

module.exports = (passport) => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });


  //회원가입
  passport.use('local-signup', new LocalStrategy({ // local 전략을 세움
    usernameField: 'email',
    passwordField: 'password',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
  }, (req, email, password, done) => {
    User.findOne({ email : email }, (err, user) => {
      if (err) return done(null); // 서버 에러 처리
      if (user) return done(null, false, req.flash('signupMessage', '중복된 이메일입니다.')); // 임의 에러 처리


      const newUser = new User();
      newUser.save((err, user) => {
        if(err) throw err;
        return done(null, newUser); //serializeUser에 값을 넘겨줍니다.
      }); //db에 저장
    });
  }));
};