const router = require("express").Router();
const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {getPost, getProfile} = require("../controllers/mainCon");

router.get('/', isLogin, getPost);

router.get('/getProfile', isLogin, getProfile);

module.exports = router;