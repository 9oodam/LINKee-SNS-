const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {loginUser, makeRoom} = require("../controllers/livechatCon");

// livechat.html 띄우기
router.get("/",isLogin,(req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/livechat.html");
});

// livechatRoom.html 띄우기
router.get("/room",isLogin,(req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/livechatRoom.html");
});

// test chat html 띄우기
router.get("/test",(req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/chatTest.html");
});

// livechat.html : 맞팔 유저 중 로그인/로그아웃 확인
router.get('/getFriends', isLogin, loginUser);

// 방 만들기
router.get('/makeRoom', isLogin, makeRoom);

module.exports = router;