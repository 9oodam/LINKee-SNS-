const router = require("express").Router();
// isLogin 가져오기
const {viewPost} = require("../controllers/mainCon");

router.get('/', viewPost);

module.exports = router;