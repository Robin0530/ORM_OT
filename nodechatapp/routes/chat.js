var express = require('express');
var router = express.Router();


/*
- 사용자 웹사이트의 로그인 페이지 요청 라우팅 메소드
- localhost:3000/chat
 */
router.get('/', async(req, res, next)=>{

  //URL을 통해 전달되는 닉네임값을 추출합니다.
  var nickName = req.query.nickName;

  const channel ={
    channel_id:1,
    category_code:1,
    channel_name:"샘플채널1",
    user_limit:100,
    channel_img_path:"/img/profile_small.jpg",
    channel_desc:"샘플채널1 설명",
    reg_date:Date.now(),
    reg_member_id:1
};

  res.render('chat',{channel,nickName});
});



module.exports = router;
