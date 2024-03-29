var express = require('express');
var router = express.Router();

var db = require('../models/index');
const bcrypt = require('bcryptjs');

//passport 객체 참조
const passport = require('passport');

// 세션 미들웨어 적용 예시
const { isLoggedIn, isNotLoggedIn } = require('./passportMiddleware');


/* 
- 관리자 웹사이트의 로그인 웹페이지를 제공하는 라우팅 메소드
- 사용자 계정정보가 아닌 관리자 계정정보를 통한 로그인을 시도합니다.
- http://localhost:3000/login
*/
router.get('/login', async(req, res, next) => {
  res.render('login', {layout:"loginLayout", loginResult:"", loginError: req.flash('loginError')});
});

/*
- 로그인정보 처리 라우팅메소드 - express-session 기반으로 구현
- 로그인 완료시 서버세션정보를 생성하고 메인페이지로 이동한다.
 */
router.post('/login', async(req, res, next) => {
  
  // 로그인 처리결과 메시지 변수선언
  var loginResult = "";

  // STEP1: 로그인 폼에서 사용자 입력한 관리자 아이디와 암호값을 추출합니다.
  var adminId = req.body.adminId;
  var adminPwd = req.body.adminPwd;

  // STEP2: 아이디와 암호값을 체크합니다.
  // 동일한 관리자 아이디가 존재하는지 체크합니다.
  var admin = await db.Admin.findOne({where:{admin_id: adminId}});

  // 관리자 계정이 없으면..
  if(admin == null){
    loginResult= "해당 관리자 계정이 존재하지 않습니다.";
    
    // 로그인을 실패한경우 해당 로그인 뷰파일에 로그인결과 데이터를 전달한다.
    res.render('login', {layout:"loginLayout", loginResult});
  } else {

    // 정상적으로 동일한 관리자 계정이 존재하는 경우
    var isCorrectPwd = await bcrypt.compare(adminPwd, admin.admin_password);
    
    // 암호값이 동일하면 정상적인 관리자
    // STEP3: 관리자 아이디와 암호가 동일하다면 서버세션값을 설정합니다.
    if(isCorrectPwd) {
      req.session.isLogined = true;
      req.session.loginUser = {
        adminId: admin.admin_id,
        adminName: admin.admin_name,
        email: admin.email,
        adtelephoneminName: admin.telephone,
        dept_name: admin.dept_name,
      };

      // 세션저장 후 지정 페이지로 이동처리
      // 세션정보를 서버메모리에 최종 저장후 이동할 페이지를 저장한다.
      req.session.save(function() {

        // STEP4: 정상적으로 로그인시 메인페이지로 이동시킵니다.
        res.redirect('/');
      });
      
    // 암호가 틀리면
    } else { 
      loginResult= "암호가 일치하지 않습니다.";

      // 로그인을 실패한경우 해당 로그인 뷰파일에 로그인결과 데이터를 전달한다.
      res.render('login', {layout:"loginLayout", loginResult});
    }
  }
});


/*
- 로그인정보 처리 라우팅메소드 - passport 로컬인증전략을 통한 로그인 구현
- 로그인 완료시 서버세션정보를 생성하고 메인페이지로 이동한다.
 */
router.post('/passportlogin', async(req, res, next) => {
  
  // 패스포트 기반 인증처리 메소드 호출하기
  passport.authenticate('local', (authError, user, info) => {
    //인증에러 발생시
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect('/login');
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      //정상 로그인시 메인페이지 이동
      return res.redirect('/');
    });

  })(req, res, next);

});




/*
- 관리자 계정으로 로그인 성공 이후에 최초로 보여줄 관리자 웹사이트 메인페이지
- 반드시 관리자 로그인 성공후에 접속이 가능
- http://localhost:3000 
 */
router.get('/', isLoggedIn, async(req, res, next) => {

  // 로그인 인증여부 체크 후 미인증시 로그인페이지로 보내버림
  // if(req.session.isLogined == undefined) {
  //   res.redirect('/login');
  // }

  // 로그인한 사용자 세션정보 추출해보자
  // var isLogined = req.session.isLogined;
  // var loginUserData = req.session.loginUser;

  // console.log("로그인 세션정보 추출하기:", loginUserData);

  //패스포트방식으로 생성된 세션정보 조회하기
  var loginUserData = req.session.passport.user;

  res.render('index', {loginUserData});
});


//로그아웃기능 구현
router.get('/logout',function(req,res,next){

  req.logout(function(err){
    if(err){
      return next(err);
    }

    req.session.destroy();
    res.redirect('/login');

  });

  // req.logout();
  // req.session.destroy();
  // res.redirect('/login');
});


module.exports = router;
