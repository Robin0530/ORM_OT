var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 시퀄라이즈 연결
var sequelize = require('./models/index.js').sequelize;

require('dotenv').config();

//CORS 패키지 참조하기 
const cors = require("cors");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memberRouter = require('./routes/member');
var chatRouter = require('./routes/chat');

var memberAPIRouter = require('./routes/memberAPI');


var app = express();


//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync();

//모든 호출 허락
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/member', memberRouter);
app.use('/chat', chatRouter);

app.use('/api/member', memberAPIRouter);


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
