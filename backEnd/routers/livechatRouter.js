const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {loginUser} = require("../controllers/livechatCon");

router.get('/getFriends', isLogin, loginUser)

module.exports = router;