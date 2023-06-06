const router = require("express").Router();
// isLogin 가져오기
// levelCheck 가져오기

const {viewPost, getProfile} = require("../controllers/mainCon");

router.get('/', viewPost);

router.get('/getProfile', getProfile);

module.exports = router;