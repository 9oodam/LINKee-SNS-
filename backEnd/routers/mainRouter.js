const router = require("express").Router();
// isLogin 가져오기
<<<<<<< HEAD
const {viewPost} = require("../controllers/mainCon");

router.get('/', viewPost);

=======
// levelCheck 가져오기

const {viewPost, getProfile} = require("../controllers/mainCon");

router.get('/', viewPost);

router.get('/getProfile', getProfile);

>>>>>>> di
module.exports = router;