const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

const {viewAll, searchName, searchTag} = require("../controllers/searchCon");

const multer = require("multer");
const upload = multer();

router.get('/', isLogin, viewAll);

router.post('/username', isLogin, upload.none(), searchName);
router.post('/tag', isLogin, upload.none(), searchTag);

module.exports = router;