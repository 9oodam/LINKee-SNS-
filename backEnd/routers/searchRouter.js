const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
// levelCheck 가져오기

<<<<<<< HEAD
const path = require("path");
router.get("/",(req,res)=>{
    const filePath = "/home/ubuntu/frontEnd/page/search.html";
    res.sendFile(filePath);
});

const {viewAll, searchThings} = require("../controllers/searchCon");

router.get('/post', isLogin, viewAll);
=======
const {viewAll, searchName, searchedPost, searchUser} = require("../controllers/searchCon");

const multer = require("multer");
const upload = multer();

// 검색 페이지
router.get('/', isLogin, viewAll);
// 검색했을 때
router.post('/nickname', isLogin, upload.none(), searchName);
>>>>>>> di


// 검색된 태그가 들어있는 게시물을 보여주는 페이지
router.get('/searched/:id', isLogin, searchedPost);

// 검색된 유저 정보 보여주는 페이지
router.get('/user/:id', isLogin, searchUser);

module.exports = router;