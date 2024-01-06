// 회원 정보와 관련된 페이지들의 라우터 파일(전체 회원 목록 조회, 회원 상세정보 조회, 신규회원생성, 회원삭제 등)

// Express 객체에서 제공하는 Router메소드를 호출해서 사용자 웹페이지에 대한 요청과 응답을 제어하는
// 라우터 객체를 먼저 정의 합니다.
var express = require('express');
var router = express.Router();

var db = require('../models/index');

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
*** ORM DB 프로그래밍 ***
- 이미 로딩된 회원가입페이지에서 사용자가 입력한 회원가입정보를 받아서 정보를 추출해 DB에 반영처리하는 라우팅 메소드
- 요청방식: post
- 호출주소: http://localhost:3000/member/entry
- 응답결과: 메인페이지로 이동시킨다.
 */
router.post('/entry', async(req, res, next) => {

    // STEP1: 사용자가 입력한 폼태그내의 입력요소의 name특성에 정의된 키명으로 req.body.티명 정보를 추출한다.
    // ejs의 body에 있는 name값
    var {email, member_password, name, file, telephone, birth_date, entry_type_code, use_state_code, reg_date } = req.body;

    // STEP2: 추출된 정보를 기반으로 DB에 저장할 데이터객체(JSON)을 생성한다.
    // 속성명은 DB테이블명과 동일해야한다~! 변수명과 속성명 같으면 변수명 생략가능
    var member = {
        email,
        member_password,
        name,
        telephone,
        entry_type_code,
        use_state_code,
        birth_date,
        reg_date: Date.now(),
        reg_member_id: 1
    }

    // STEP3: 회원정보 JSON데이터를 DB에 회원테이블에 저장처리한다. (ORM을 통해)
    var members = await db.Member.create(member);


    // STEP4: DB저장을 완료하고 회원가입이 완료되었다고 가정하고 현재 사용자의 웹브라우저 페이지를 메인 페이지로 이동시킨다.

    // res.redirect('/이동주소')메소드는 특정 url 주소로 사용자 웹브라우저의 주소를 이동시켜준다.
    // 현재 프로젝트의 메인페이지 이동시킨다. (http://localhost:3000/)
    res.redirect('/member/list');
});


/*
***비동기 방식 라우팅 메서드***
==> 입력한 정보를 DB에 등록하면서 var updateMembers에서 바로 등록한 회원정보 메일정보 수정하는 비동기방식
- 이미 로딩된 회원가입페이지에서 사용자가 입력한 회원가입정보를 받아서 정보를 추출해 DB에 반영처리하는 라우팅 메소드
- 요청방식: post
- 호출주소: http://localhost:3000/member/entry
- 응답결과: 메인페이지로 이동시킨다.
*/
/* 
router.post('/entry', async(req, res, next) => {

    // STEP1: 사용자가 입력한 폼태그내의 입력요소의 name특성에 정의된 키명으로 req.body.티명 정보를 추출한다.
    // ejs의 body에 있는 name값
    var {email, member_password, name, file, telephone, birth_date, entry_type_code, use_state_code, reg_date } = req.body;

    // STEP2: 추출된 정보를 기반으로 DB에 저장할 데이터객체(JSON)을 생성한다.
    // 속성명은 DB테이블명과 동일해야한다~! 변수명과 속성명 같으면 변수명 생략가능
    var member = {
        email,
        member_password,
        name,
        telephone,
        entry_type_code,
        use_state_code,
        birth_date,
        reg_date: Date.now(),
        reg_member_id: 1
    }

    // STEP3: 회원정보 JSON데이터를 DB에 회원테이블에 저장처리한다. (ORM을 통해)

    // TASK1: 신규 회원정보를 등록하고 등록된 회원정보를 반환받는다.
    var members = await db.Member.create(member);


    // STEP4: DB저장을 완료하고 회원가입이 완료되었다고 가정하고 현재 사용자의 웹브라우저 페이지를 메인 페이지로 이동시킨다.

    // TASK2: 등록된 신규회원정보의 메일정보를 수정한다.
    var updateMembers = await db.Member.update(
        {email:'test88@test.co.kr'},
        {where:{member_id:members.member_id}}
        );

    // res.redirect('/이동주소')메소드는 특정 url 주소로 사용자 웹브라우저의 주소를 이동시켜준다.
    // 현재 프로젝트의 메인페이지 이동시킨다. (http://localhost:3000/)
    res.redirect('/member/list');
});

*/



/*
*** 동기 방식 라우팅 메서드***
- 이미 로딩된 회원가입페이지에서 사용자가 입력한 회원가입정보를 받아서 정보를 추출해 DB에 반영처리하는 라우팅 메소드
- 요청방식: post
- 호출주소: http://localhost:3000/member/syncentry
- 응답결과: 메인페이지로 이동시킨다.
*/
/*
router.post('/syncentry', function(req, res, next){

    // STEP1: 사용자가 입력한 폼태그내의 입력요소의 name특성에 정의된 키명으로 req.body.티명 정보를 추출한다.
    // ejs의 body에 있는 name값
    var {email, member_password, name, file, telephone, birth_date, entry_type_code, use_state_code, reg_date } = req.body;

    // STEP2: 추출된 정보를 기반으로 DB에 저장할 데이터객체(JSON)을 생성한다.
    // 속성명은 DB테이블명과 동일해야한다~! 변수명과 속성명 같으면 변수명 생략가능
    var member = {
        email,
        member_password,
        name,
        telephone,
        entry_type_code,
        use_state_code,
        birth_date,
        reg_date: Date.now(),
        reg_member_id: 1
    }

    // STEP3: 회원정보 JSON데이터를 DB에 회원테이블에 저장처리한다. (ORM을 통해)

    // TASK1: 신규 사용자 정보를 등록하고 등록이 완료되는 콜백함수에 두번째 태스크를 호출합니다.
    db.Member.create(member).then(function(createResult) {
        console.log("신규 회원 정보: ", createResult);

        // TASK2: 기등록된 사용자 정보를 수정처리하는 두번째 테스크시작
        // db.Member.update({수정할키:값}, {where:{수정하려는 모델속성의 이름:조건}}.then(function(){ }));
        db.Member.update({email:"test99@test.co.kr"},
            {where:{member_id:createResult.member_id}}
        ).then(function(updateResult) {
            console.log("신규회원 정보 수정결과 적용건수:", updateResult);

            // TASK3: 최종처리 후 페이지로 이동시켜준다.
            res.redirect('/member/list');
        })

    });
    // ORM 프레임쿼크에 의해서 db.Member.create(member)는
    // INSERT INTO members(email) VALUES('test@test.co.kr');


    // STEP4: DB저장을 완료하고 회원가입이 완료되었다고 가정하고 현재 사용자의 웹브라우저 페이지를 메인 페이지로 이동시킨다.


    // res.redirect('/이동주소')메소드는 특정 url 주소로 사용자 웹브라우저의 주소를 이동시켜준다.
    // 현재 프로젝트의 메인페이지 이동시킨다. (http://localhost:3000/)
    // res.redirect('/member/list');
});
*/




// 회원목록 페이지 요청 라우팅메소드
router.get('/list', async(req, res, next)=> {

    var member = await db.Member.findAll({
        attributes: ['member_id','email','name','telephone','birth_date','use_state_code','reg_date']
    });


    res.render('member/list.ejs', {member});
});


// 회원정보조회 처리 라우팅 메소드
router.post('/list', async(req, res, next)=> {

    var {email, name, telephone} = req.body;

    var search = {
        email,
        name,
        telephone
    };

    var member = await db.Member.findAll({where:search})


    res.render('member/list.ejs', {member});
});




// 회원정보 수정 웹페이지 요청 라우팅메소드
router.get('/modify/:mid', function(req, res, next) {

    res.render('member/modify.ejs');
});


// 회원정보 수정처리 라우팅메소드
router.post('/modify/:mid', function(req, res, next) {

    res.redirect('/member/list');
});



// 라우터파일내의 라우터 객체를 반드시 모듈외부로 기능을 노출해야합니다.
module.exports = router;
