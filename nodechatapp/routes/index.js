var express = require('express');
var router = express.Router();

// jsonwebtoken 패키지를 참조
const jwt = require('jsonwebtoken')

/*
- 사용자 웹사이트의 로그인 페이지 요청 라우팅 메소드
- localhost:3000/login
 */
router.get('/login', function(req, res, next) {
  res.render('login');
});


/*
- 사용자 웹사이트의 메인으로 채팅 웹페이지를 제공하는 라우팅 메소드
- localhost:3000/
 */
router.get('/', function(req, res, next) {
  res.render('chat');
});


/* 
- jwt 토큰 발급 테스트 샘플 
- http://localhost:3000/makeJWT
*/
router.get('/makeJWT', function(req, res, next) {

  // STEP1: 토큰에 저장한 JSON 데이터 생성
  var userData = {
    user_id:1,
    email:"test1@test.co.kr",
    user_type:1,
    name:"이보람",
    telephone:"010-1111-2224"
  };

  // STEP2: JSON 데이터를 JWT토큰 문자열로 생성한다.
  // jwt.sign('JSON데이터', JWT인증키값:만들때 해독할때 동일한 인증키를 사용해야함. 옵션{토큰유효시간, 생성자정보});
  const token = jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:'24h', issuer:"robin"});

  res.render('makeJWT.ejs', {token});
});


/*
- 제공된 jwt토큰의 값을 해석해봅니다.
- http://localhost:3000/readJWT?token=kjsdalkejklwqj 
*/
router.get('/readJWT', function(req, res, next) {

  var token = req.query.token;

  // 토큰에서 json 데이터만 추출해보자
  var jsonData = jwt.verify(token, process.env.JWT_SECRET)
  
  console.log('추출된 json 원본데이터:', jsonData);

  res.render('readJWT', {jsonData});
});

module.exports = router;
