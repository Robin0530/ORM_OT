/*
- 게시글 정보관리 웹페이지 라우팅 파일
- http://localhost:3000/article/~
*/

var express = require('express');
var router = express.Router();

// 날짜변환
var moment = require('moment');

// ORM db객체를 참조한다.
// db객체를 선언할 때 반드시 var로 선언한다.
var db = require('../models/index.js');
// Op객체 생성
const Op = db.sequelize.Op;


/* 
게시글 정보관리 라우팅 기능 제공
- http://localhost:3000/article/list
- get
- 게시글 목록 정보조회 웹페이지 요청 라우팅메소드
*/
router.get('/list', async(req, res, next) => {

  // article 테이블의 모든 게시글 목록을 조회해온다.
  var articles = await db.Article.findAll();

  // 조회결과 모든 게시글 데이터를 뷰에 전달.
  res.render('article/list', {articles, moment});

});

/*
- 게시글 목록 정보조회 처리 라우팅메소드
- http://localhost:3000/article/list
- post
 */
router.post('/list', async(req, res, next)=> {


  var articles = [];

  res.render('article/list', {articles})
});


/* 
- 신규 게시글 등록 웹페이지를 요청하는 라우팅메소드
- http://localhost:3000/article/create
- get
*/
router.get('/create', async(req, res, next) => {
  res.render('article/create');
});


/* 
- 신규 게시글 정보를 등록처리하는 라우팅 메소드
- http://localhost:3000/article/create
- post
*/
router.post('/create', async(req, res, next) => {

  // STEP1: 사용자 입력폼에서 전달된 사용자 입력정보를 추출한다.
  var title = req.body.title;
  var contents = req.body.contents;
  var articleTypeCode = req.body.articleTypeCode;
  var isDisplayCode = req.body.isDisplayCode;

  // STEP2: DB article 테이블에 저장할 게시글 JSON 단일데이터 구조를 정의하고 수집된 데이터를 할당한다.
  // 해당 JSON 데이터 객체의 속성명은 반드시 데이터모델(modles/article.js)의 속성명과 동일해야 한다.
  var article = {
    board_type_code: 2,
    title,
    article_type_code: articleTypeCode,
    contents,
    view_count: 0,
    ip_address: '111.111.111.111',
    is_display_code: isDisplayCode,
    reg_date: Date.now(),
    reg_member_id: 0,
    edit_date: Date.now(),
    edit_member_id: 0
  };

  // 신규 게시글 정보가 등록되면 create()메소드는 등록된 실제db의 데이터를 반환해준다.
  var registedCnt = await db.Article.create(article);

  res.redirect('/article/list');
});



/* 
*** 쿼리스트링 방식 ***
- 게시글 삭제
- http://localhost:3000/article/delete/delete?aid=1
- get
*/
router.get('/delete', async(req, res, next) => {

  // STEP1: URL에 통해 전달된 삭제코자하는 게시글의 고유번호를 추출한다.
  var articleId = req.query.aid;

  // STEP2: 해당 게시글 고유번호를 DB article테이블에서 영구삭제한다.
  var deleteCnt = await db.Article.destroy({where:{article_id:articleId}});

  // 삭제 처리 로직
  res.redirect('/article/list');
});


/* 
- 게시글 수정 웹페이지를 요청하는 라우팅메소드
- http://localhost:3000/article/modify/1
- get
*/
router.get('/modify/:aid', async(req, res, next) => {

  // STEP1: URL주소에서 게시글고유번호를 추출한다.
  var articleId = req.params.aid;

  // STEP2: 추출한 게시글 고유번호 기준으로 게시글 테이블에서 해당 단일게시글 정보를 조회해온다.
  var article = await db.Article.findOne({
    where:{article_id:articleId}});

  // STEP3: 조회된 단일 게시글 JSON데이터를 modify.ejs 파일에 전달한다.
  res.render('article/modify', {article, moment});
});


/* 
- 게시글 정보를 수정처리하는 라우팅메소드
- http://localhost:3000/article/modify/1
- post
*/
router.post('/modify/:aid', async(req, res, next) => {

  // STEP1: URL주소에서 게시글고유번호를 추출한다.
  var articleId = req.params.aid;

  // STEP2: 수정하고자 하는 수정JOSN 단일 데이터를 정의하고 값을 할당한다.
  // 화면상에서 보여지는 것 위주로 수정하기
  var updateArticle = {
    title: req.body.title,
    contents: req.body.contents,
    article_type_code: req.body.articleTypeCode,
    ip_address: "222.222.222.222",
    is_display_code: req.body.isDisplayCode,
    edit_date: Date.now(),
    edit_member_id: 0,
  }; 

  // STEP3: article테이블에 해당 게시글 번호 단일 게시글 정보를 수정json 데이터로 변경적용한다.

  var updateCnt = await db.Article.update(updateArticle,{
    where:{article_id:articleId}
  });

  // STEP4: 수정적용 완료 후 목록 페이지로 이동
  res.redirect('/article/list');
});


module.exports = router;