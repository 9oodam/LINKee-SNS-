const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
const {myPost,mypage,editProfile} = require("../controllers/mypageCon");
const {uploadImg,updateProfileImg} = require("../middleware/uploadImg");

router.get("/",isLogin,myPost);

router.get("/users",isLogin,mypage);

router.post("/edit",isLogin, updateProfileImg.single("img"), editProfile);

// router.post("/editPic",isLogin,updateProfileImg.single("img"),(req,res)=>{
//     console.log(req);
// });

module.exports = router;