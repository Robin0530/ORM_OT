var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

//일회성(휘발성) 데이터를 특정 페이지(뷰)에 전달하는 방식제공 플래시 팩키지참조하기
var flash = require('connect-flash');


//express기반 서버세션 관리 팩키지 참조하기 
var session = require('express-session');

const passport = require('passport');

//인증관련 패스포트 개발자 정의 모듈참조, 로컬 로그인 전략 적용
const passportConfig = require('./passport/index.js');

//패스포트 설정처리
passportConfig(passport);




//CORS 지원위해 패키지참조 
const cors = require("cors");

//dotenv 어플리케이션 환경설정관리 팩키지 참조 및 구성하기 
require('dotenv').config();

// 기본 노트프로젝트 템플릿에서 제공하는 기본라우터 파일 참조영역
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 개발자 정의 라우터 파일 참조영역
var memberRouter = require('./routes/member.js');
var channelRouter = require('./routes/channel.js');
var articleRouter = require('./routes/article.js');
var adminRouter = require('./routes/admin.js');

// RESAPI 전용 라우터 파일 참조영역
var channelAPIRouter = require('./routes/channel-API.js');

// 시퀄라이즈 연결
var sequelize = require('./models/index.js').sequelize;

var app = express();


//flash 메시지 사용 활성화: cookie-parser와 express-session을 사용하므로 이들보다는 뒤로 위치
app.use(flash());


//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync();


//CORS 도메인 지정 허용하기 
// app.use(
//   cors({
//     methods: ["GET", "POST", "DELETE", "OPTIONS"],
//     origin: ["http://localhost:3000", "https://beginmate.com"],
//   })
// );


// 모든 호출 허락
app.use(cors());

// express-session기반 서버세션 설정 구성하기
app.use(
  session({
    resave: false,
    saveUninitialized: true, 
    secret: "testsecret", 
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 5 //5분동안 서버세션을 유지하겠다.(1000은 1초)
    },
  }),
);

//패스포트-세션 초기화 : express session 뒤에 설정
app.use(passport.initialize());
app.use(passport.session());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 레이아웃 적용
app.set('layout', 'layout');
app.set("layout extractScripts", true); 
app.set("layout extractStyles", true); 
app.set("layout extractMetas", true); 
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// 상단에서 참조한 기본 라우터들의 디폴트 URL 호출주소 정의영역
// http://localhost:3000/
app.use('/', indexRouter);
// http://localhost:3000/users
app.use('/users', usersRouter);

// 개발자가 정의한 라우터 파일의 디폴트 URL 주소정의 영역
// http://localhost:3000/member
app.use('/member', memberRouter);
// http://localhost:3000/channel
app.use('/channel', channelRouter);
// http://localhost:3000/article
app.use('/article', articleRouter);

app.use('/admin', adminRouter);

// 채널정보 전용관리 RESTAPI 라우터 파일의 디폴트 url 호출주소를 정의합니다.
// http://localhost:3000/api/channel
app.use('/api/channel', channelAPIRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
