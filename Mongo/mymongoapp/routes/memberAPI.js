var express = require('express');
var router = express.Router();

// 날짜변환
// var moment = require('moment');

// MongoDB ODB 모델 참조하기
const Member = require('../schemas/member');


/*
- 회원목록조회
- http://localhost:3000/member/list
 */
router.get('/list', async(req, res, next)=> {

    try{
        const members = await Member.find({});
        res.json(members);
        
    }catch(err) {
        console.log(err);
        next(err);
    }
});

/*
- 회원정보수정하기
- http://localhost:3000/member/modify
*/
router.post('/modify', async(req, res, next)=> {

    const memberid = req.body.memberid;
    const memberpwd = req.body.memberpwd;
    const membername = req.body.membername;
    const email = req.body.email;
    const age = req.body.age;
    const married = req.body.married;

    try{
        var memberData = {
            memberid,
            memberpwd,
            membername,
            email,
            age,
            married,
            createdAt: Date.now(),
        }

        const result = await Member.updateOne({memberid:memberid}, memberData);
        res.json(result);

    }catch(err) {
        console.log(err);
        next(err);
    }
});


/*
- 회원정보등록하기
- http://localhost:3000/member/create
*/
router.post('/create', async(req, res, next)=> {

    const memberid = req.body.memberid;
    const memberpwd = req.body.memberpwd;
    const membername = req.body.membername;
    const email = req.body.email;
    const age = req.body.age;
    const married = req.body.married;

    try{
        var memberData = {
            memberid,
            memberpwd,
            membername,
            email,
            age,
            married,
            createdAt: Date.now(),
        }

        const member = await Member.create(memberData);
        res.json(member);

    }catch(err) {
        console.log(err);
        next(err);
    }
});



/*
- 단일 회원목록정보 삭제
- http://localhost:3000/member/delete?id=robin
 */
router.get('/delete', async(req, res, next)=> {

    try{
        // 삭제대상 회원아이디 추출
        const memberId = req.query.id;

        const result = await Member.deleteOne({memberid:memberId});
        res.json(result);
        
    }catch(err) {
        console.log(err);
        next(err);
    }
});


/*
- 단일 회원정보 조회
- http://localhost:3000/member/robin
 */
router.get('/:memberid', async(req, res, next)=> {

    var memberId = req.params.memberid;

    try{
        const members = await Member.find({memberid:memberId});
        res.json(members);
        
    }catch(err) {
        console.log(err);
        next(err);
    }
});


module.exports = router;
