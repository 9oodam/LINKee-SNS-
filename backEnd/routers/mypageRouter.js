const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
const {myPost, follow, cancel} = require("../controllers/mypageCon");

// mypage
router.get("/mypost", isLogin, myPost);

// userpage
router.get("/follow/:id", isLogin, follow); // 팔로우

module.exports = router;