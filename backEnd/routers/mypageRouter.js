const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
const {myPost,mypage,editProfile,currentUser} = require("../controllers/mypageCon");
const {uploadImg,updateProfileImg} = require("../middleware/uploadImg");

const path = require("path");
router.get("/",isLogin,currentUser);

router.get("/mypost",isLogin,myPost);

router.get("/users",isLogin,mypage);

router.get("/edit",(req,res)=>{
    const filePath = "/home/ubuntu/frontEnd/page/editProfile.html";
    res.sendFile(filePath);
});

router.post("/edit",isLogin, updateProfileImg.single("img"), editProfile);

// router.post("/editPic",isLogin,updateProfileImg.single("img"),(req,res)=>{
//     console.log(req);
// });

module.exports = router;