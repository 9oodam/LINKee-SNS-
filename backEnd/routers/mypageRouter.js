const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
const {myPost, follow, removeFollower} = require("../controllers/mypageCon");
const {addFollowNoti} = require("../controllers/notiCon");

// mypage
router.get("/mypost", isLogin, myPost);

// userpage
router.get("/follow/:id", isLogin, addFollowNoti, follow); // 팔로우

// followList
router.get("/remove/:id", isLogin, removeFollower)

module.exports = router;