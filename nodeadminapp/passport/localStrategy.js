var bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
var db = require('../models/index');

module.exports = passport => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'adminId', //로그인 페이지의 사용자아이디 UI INPUT 요소 name값
				passwordField: 'adminPwd',//로그인 페이지의 사용자 암호 INPUT 요소 name값
			},
			async (userId, userPWD, done) => {

				try {
					
					// STEP1: 사용자가 입력한 관리자 아이디값을 기준으로 관리자 계정아이디 조회
					const exUser = await db.Admin.findOne({ where: { admin_id: userId } });
					if (exUser) {

						// STEP2-1: 동일한 관리자 계정아이디가 존재하는경우 암호를 체크한다.
						// exUser DB에서 가져온 password 값
						const result = await bcrypt.compare(userPWD, exUser.admin_password);
						
						if (result) {
							// STEP3: 관리자 계정 암호가 동일한경우 서버세션 객체정보의 구조를 정의하고
							// 로그인한 사용자의 정보로 세션정보를 생성한다.

							var sessionAdmin = {
								adminPSeq: exUser.admin_member_id,
								adminId: exUser.admin_id,
								adminName: exUser.admin_name,
								adminPhone: exUser.telephone,
								adminEmail: exUser.email,
							};

							done(null, sessionAdmin);
						} else {
							// 사용자 암호가 일치하지 않은 경우
							done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
						}
					} else {
						// SPTE2-2: 사용자 아이디가 존재하지 않은경우
						done(null, false, { message: '아이디가 존재하지 않습니다.' });
					}
				} catch (error) {
					console.error(error);
					done(error);
				}

			},
		),
	);
};