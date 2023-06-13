const router = require("express").Router();
// isLogin 가져오기
const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const path = require("path");
router.get("/",(req,res)=>{
    const filePath = "/home/ubuntu/frontEnd/page/main.html";
    res.sendFile(filePath);
});

const {getPost, getProfile} = require("../controllers/mainCon");

router.get('/posts', isLogin, getPost);

router.get('/getProfile',isLogin, getProfile);

module.exports = router;