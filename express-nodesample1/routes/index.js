var express = require('express');
var router = express.Router();

/* 
- 메인 페이지 요청 라우팅 메소드
- 클라이언트 요청방식 : Get 방식
- 호출주소체계 : http://localhost:3000
- 응답결과 : views/index.ejs 뷰파일의 내용을 클라이언트에 전달
*/
router.get('/', function(req, res, next) {
  
  var test = "테스트데이터";

  console.log("디버깅 테스트입니다. test 변수값:", test);

  res.render('index.ejs', { title: 'test' });

});

/* 
- 샘플 웹페이지를 요청하는 라우팅 메소드
- 요청방식 : Get 방식
- 호출주소체계 : http://localhost:3000/sample
- 응답결과 : views/sample.ejs 뷰파일안의 html이 클라이언트로 전송(응답)
*/
router.get('/sample', function(req, res, next) {

  // 웹브라우저나 클라이언트에 views/sample.ejs 뷰 파일안의 html태그를 전송합니다.
  res.render('sample.ejs');
});

module.exports = router;
