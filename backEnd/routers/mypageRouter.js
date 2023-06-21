const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
const {myPost, follow, removeFollower,mypage,editProfile} = require("../controllers/mypageCon");
const {uploadImg,updateProfileImg} = require("../middleware/uploadImg");

const path = require("path");

router.get("/",async (req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/mypage.html");
});

router.get("/mypost",isLogin,myPost);

// userpage
router.get("/follow/:id", isLogin, follow); // 팔로우

router.get("/users",isLogin,mypage);

router.get("/edit",isLogin,(req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/editProfile.html");
});

router.post("/edit",isLogin, updateProfileImg.single("img"),(err,req,res,next)=>{
    if(err instanceof multer.MulterError){
        res.status(400).json({error : "파일이 너무 크네요"});
    }
} ,editProfile);

// router.post("/editPic",isLogin,updateProfileImg.single("img"),(req,res)=>{
//     console.log(req);
// });

// followList
router.get("/remove/:id", isLogin, removeFollower)

module.exports = router;