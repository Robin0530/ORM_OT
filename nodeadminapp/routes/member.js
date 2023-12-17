// 회원 정보와 관련된 페이지들의 라우터 파일(전체 회원 목록 조회, 회원 상세정보 조회, 신규회원생성, 회원삭제 등)

// Express 객체에서 제공하는 Router메소드를 호출해서 사용자 웹페이지에 대한 요청과 응답을 제어하는
// 라우터 객체를 먼저 정의 합니다.
var express = require('express');
var router = express.Router();

/* 
- 회원정보 신규 등록을 위한 웹페이지 요청 라우팅 메소드
- 요청방식: Get- 클라이언트(웹브라우저)에서 링크나 URL 방식을 통해 특정 웹페이지를 요청
- 호출주소: http://localhost:3000/member/entry
- 응답결과: entry.ejs의 안에 있는 웹페이지 소스를 웹브라우저로 전달한다.
*/
router.get('/entry', async(req, res) => {

    // render => MVC패턴에서 화면을 담당하는 views파일을 지정해서 브라우저로 보여지게 하는것을 담당
    // res.render('특정 웹페이지 html소스가 담겨있는 뷰영역에 경로를 지정합니다.')


    res.render('member/entry.ejs');

});


/*
- 이미 로딩된 회원가입페이지에서 사용자가 입력한 회원가입정보를 받아서 정보를 추출해 DB에 반영처리하는 라우팅 메소드
- 요청방식: post
- 호출주소: http://localhost:3000/member/entry
- 응답결과: 메인페이지로 이동시킨다.
*/
router.post('/entry', async(req, res, next) => {

    // STEP1: 사용자가 입력한 폼태그내의 입력요소의 name특성에 정의된 키명으로 req.body.티명 정보를 추출한다.
    // ejs의 body에 있는 name값
    var memberId = req.body.memberid;
    var memberPassword = req.body.password;
    var memberName = req.body.name;

    // STEP2: 추출된 정보를 기반으로 DB에 저장할 데이터객체(JSON)을 생성한다.
    // 속성명은 DB테이블명과 동일해야한다~! 변수명과 속성명 같으면 변수명 생략가능
    var member = {
        member_id : memberId,
        password : memberPassword,
        name : memberName
    }

    // STEP3: 회원정보 JSON데이터를 DB에 회원테이블에 저장처리한다. (ORM을 통해)



    // STEP4: DB저장을 완료하고 회원가입이 완료되었다고 가정하고 현재 사용자의 웹브라우저 페이지를 메인 페이지로 이동시킨다.


    // res.redirect('/이동주소')메소드는 특정 url 주소로 사용자 웹브라우저의 주소를 이동시켜준다.
    // 현재 프로젝트의 메인페이지 이동시킨다. (http://localhost:3000/)
    res.redirect('/');

});




// 라우터파일내의 라우터 객체를 반드시 모듈외부로 기능을 노출해야합니다.
module.exports = router;
