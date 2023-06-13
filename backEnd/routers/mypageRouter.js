const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
const {myPost,mypage,editProfile} = require("../controllers/mypageCon");
const {uploadImg,updateProfileImg} = require("../middleware/uploadImg");

const path = require("path");
// router.get("/",(req,res)=>{
//     const filePath = "/home/ubuntu/frontEnd/page/mypage.html";
//     res.sendFile(filePath);
// });

router.get("/",isLogin,myPost,(req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/mypage.html");
});

router.get("/users",isLogin,mypage);

router.post("/edit",isLogin, updateProfileImg.single("img"), editProfile);

// router.post("/editPic",isLogin,updateProfileImg.single("img"),(req,res)=>{
//     console.log(req);
// });

module.exports = router;