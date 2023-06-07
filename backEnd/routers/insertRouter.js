const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {uploadImg} = require("../middleware/uploadImg");
const {insertPost} = require("../controllers/insertCon");

router.post('/', isLogin, uploadImg.single("img"), insertPost);

module.exports = router;