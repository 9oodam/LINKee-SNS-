const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {loginUser, makeRoom} = require("../controllers/livechatCon");

// livechat.html : 맞팔 유저 중 로그인/로그아웃 확인
router.get('/getFriends', isLogin, loginUser);

// 방 만들기
router.get('/makeRoom', isLogin, makeRoom);

module.exports = router;