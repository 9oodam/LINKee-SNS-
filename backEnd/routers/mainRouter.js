const router = require("express").Router();
// isLogin 가져오기
const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {sendFollowingUserPost, getPost, getProfile} = require("../controllers/mainCon");

router.get('/', isLogin,getPost );

router.get('/getProfile',isLogin, getProfile);

module.exports = router;