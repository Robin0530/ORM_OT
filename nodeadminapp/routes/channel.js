// 채팅방과 관련된 페이지들의 라우터 파일(채팅방 목록 조회, 참여중인 사용자 목록 조회 등)

/*
 * 채팅방(채널) 정보를 관리하는 웹페이지에 대한 라우터 파일
 * 해당 라우터파일 기본주소경로: http://localhost:3000/channel/~
 * 채팅방 생성 웹페이지, 목록페이지, 수정 페이지에 대한 웹페이지 요청 및 응답 처리 담당
 */

var express = require('express');
var router = express.Router();

var db = require('../models/index');

// 채팅방 채널 생성 웹페이지 요청 라우팅 메소드
// http://localhost:3000/channel/create
router.get('/create', async(req, res)=> {

    res.render('channel/create.ejs')

});

// 채팅방 채널 생성 웹페이지 폼에 사용자가 입력한 데이터를 추출해서 DB저장 후 지정된 페이지로 이동
// http://localhost:3000/channel/create
router.post('/create', async(req, res)=> {

    res.redirect('/channel/list')

});



// 기 생성된 채널목록을 보여주는 웹페이지 요청 라우팅 메소드
// http://localhost:3000/channel/list
router.get('/list', async(req, res)=> {

    // DB에서 모든 채널목록을 가져왔다고 가정..
    var channelList = [
        { channel_id:1, channel_name:"채널1"},
        { channel_id:2, channel_name:"채널2"},
        { channel_id:3, channel_name:"채널3"},
    ];

    res.render('channel/list.ejs', {channelList})

});


// 채널 목록 페이지에서 전달되는 조회옵션 정보를 이용해 DB에서 조건에 해당하는 채널데이터를 조회하여
// 목록 view파일에 전달해 동적으로 서버에서 HTML을 변조해서 최종 만들어진 웹페이지를 브라우저에 전달합니다.
// http://localhost:3000/channel/list
router.post('/list', async(req, res)=> {

    var channelList = [
        { channel_id:1, channel_name:"채널1"},
        { channel_id:2, channel_name:"채널2"},
        { channel_id:3, channel_name:"채널3"},
    ];

    // DB에서 조회해온 채널목록 데이터를 뷰에 전달해서 뷰에서 원래있던 HTML에 데이터를 조합해 서버에서
    // 동적으로 html코드를 생성후 최종 웹브라우저에 전달한다.
    res.render('channel/list', {channelList})

});




// ------------------둘 중 하나 구현--------------------- 추천은 파라메터 방식(검색엔진에 최적화) 

// 채널정보 상세보기 및 수정처리 웹페이지 제공 라우팅메소드-쿼리스트링방식
// 사용자 요청 HTTPRequest 객체 다루기
// 1번 req.query : URL 내 쿼리스트링 방식으로 전달되는 키의 값을 추출할 때 ?key=value&key=value
// http://localhost:3000/channel/modify?cid=1&test=테스트
router.get('/modify', async(req, res)=> {

    // STEP1: 쿼리스트링방식으로 전달되는 키값 추출하기
    var channelId = req.query.cid;

    // STEP2: DB에서 해당 채널번호와 동일한 단일채널정보를 조회해옵니다.
    var channel = { 
        channel_id: channelId,
        channel_name: "채널명"
    }

    
    res.render('channel/modify.ejs', {channel:channel})

});


// ⭐중요!!!!!!! 와일드 카드가 적용된 라우팅 메소드는 해당 라우터 파일에 최하단에 정의해야 URL충돌 문제를 해결할 수 있다.
// 채널정보 상세보기 및 수정처리 웹페이지 제공 라우팅메소드 - 파라메터방식/와일드카드방식
// 사용자 요청 HTTPRequest 객체 다루기
// 2번 req.params : 라우팅 메서드가 와일드카드 방식으로 정의되어야하며 와일드카드 내 아이디 값을 기준으로 값을 추출
// http://localhost:3000/channel/modify/1 (:키명변수)
router.get('/modify/:cid', async(req, res)=> {

    // STEP1: 와일드카드 키명(변수)을 이용해 URL 채널고유번호를 추출한다.
    var channelId = req.params.cid;

    // STEP2: DB에서 해당 채널번호와 동일한 단일채널정보를 조회해옵니다.
    var channel = { 
        channel_id: channelId,
        channel_name: "채널명"
    }

    res.render('channel/modify.ejs', {channel:channel})

})




module.exports = router;
