const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {viewAllPost, searchThings} = require("../controllers/searchCon");

router.get('/', isLogin, viewAllPost);

router.post('/', isLogin, searchThings);

module.exports = router;