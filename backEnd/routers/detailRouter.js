const router = require("express").Router();
const {isLogin} = require("../middleware/isLogin");

const {getProfile, getcontents, delBtn, getlike, likeClick, bigComment, smallComment1} = require("../controllers/mainCon");
const { SmallComment } = require("../models");

router.get('/getProfile', isLogin, getProfile);

router.get('/getcontents/:id', isLogin, getcontents);

router.get('/delBtn/:id', delBtn);

router.get('/getlike', isLogin, getlike);

router.get('/likeClick', isLogin, likeClick);

// 댓글
router.get('/bigComment/:id', bigComment);

router.get('/smallComment/:id', smallComment1);

module.exports = router;
