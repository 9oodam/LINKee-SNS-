const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {viewAll, searchThings} = require("../controllers/searchCon");

router.get('/', isLogin, viewAll);

router.post('/', isLogin, searchThings);

module.exports = router;