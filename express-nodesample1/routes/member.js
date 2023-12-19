var express = require('express');
var router = express.Router();


/* 
- 회원가입 페이지 요청 라우팅 메소드 - 동기라우팅
- 호출방식: GET-URL을 통해 웹페이지를 제공함
- 호출주소: http://localhost:3000/member/entry
- 응답결과: views/sample.ejs 뷰파일안의 html이 클라이언트로 전송(응답)
*/
// req : 웹브라우저 정보를 담고 있는 httprequest 객체
// res : 파라메터 변수(변수명)

router.get('/entry', function(req,res,next) {

    // res.render('웹브라우저로 전달된 뷰파일의 전체경로를 지정합니다.')
    res.render('member/entry.ejs');

});


/*
- 회원가입폼에서 사용자가 입력한 정보를 받아 서버에서 처리해주는 라우팅메소드 - 동기라우팅
- 호출방식: POST
- 호출주소: http://localhost:3000/member/entry
-
 */
router.post('/entry', function(req, res){

    // STEP1: 사용자 입력폼에서 사용자 입력데이터를 추출한다.
    // 폼태그내의 사용자가 입력한 요소의 값을 추출하려면 req.body.요소의 name속성명으로 추출합니다.
    var userId = req.body.memberId;
    var userPwd = req.body.memberPassword;
    var userEmail = req.body.email;
    var userName = req.body.name;

    // STEP2: DB에 회원테이블에 저장하기 위한 json 객체 데이터를 정의한다.
    // 이때 객체데이터명은 DB TABLE의 컬럼명과 동일하게!
    const member = {
        memberId: userId,
        memberPassword: userPwd,
        email: userEmail,
        name: userName
    }

    // STEP3: SQL/ORM을 이용해 DB에 회원테이블에 member 데이터를 영구저장처리한다.

    // url 주소를 기반으로 사용자브라우저의 웹페이지를 특정 주소로 바로 이동시킨다.
    // res.redirect('도메인주소를 생략한 하위 url 호출주소 정의 - 뷰 파일의 경로를 지정하는게 아닌 url기준 정의 ')
    res.redirect('/');

});



/*
- 회원로그인 웹페이지 요청 라우팅 메소드 - 비동기 라우팅 메소드
- 호출방식: Get(링크주소/URL을 직접입력해서 서버 리소스를 호출하는 방식)
- 호출주소: http://localhost:3000/member/login
- 응답결과: res.render()를 통해서 지정된 뷰파일내의 웹페이지 소스가 웹브라우저로 전달된다.
 */
router.get('/login', async(req, res)=> {

    res.render('member/login.ejs');
    
})



// 라우터 객체를 노드 어플리케이션에서 사용할 수 있도록 노출한다.
module.exports = router;