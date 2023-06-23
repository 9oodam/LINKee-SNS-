const router = require("express").Router();
// isLogin 가져오기
const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const path = require("path");
router.get("/", isLogin, (req,res)=>{
    const filePath = "/home/ubuntu/frontEnd/page/main.html";
    res.sendFile(filePath);
});

const {getPost, getProfile, getcontents, delBtn, getlike, likeClick, bigComment, smallComment1} = require("../controllers/mainCon");

router.get('/posts', isLogin, getPost);

router.get('/getProfile',isLogin, getProfile);

router.get('/getcontents/:id', isLogin, getcontents);

router.get('/delBtn/:id', delBtn);

router.get('/getlike', isLogin, getlike);

router.get('/likeClick', isLogin, likeClick);

// 댓글
router.get('/bigComment/:id', bigComment);

router.get('/smallComment/:id', smallComment1);


module.exports = router;