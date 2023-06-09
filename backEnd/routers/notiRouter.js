const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {getNoti} = require("../controllers/notiCon");

router.get('/', isLogin, getNoti);

module.exports = router;