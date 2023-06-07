const router = require("express").Router();
<<<<<<< HEAD
// isLogin 가져오기
=======
>>>>>>> di
const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {viewPost, getProfile} = require("../controllers/mainCon");

<<<<<<< HEAD
router.get('/',isLogin, viewPost);

router.get('/getProfile',isLogin, getProfile);
=======
router.get('/', isLogin, viewPost);

router.get('/getProfile', isLogin, getProfile);
>>>>>>> di

module.exports = router;