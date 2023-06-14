const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
const {myPost,mypage,editProfile} = require("../controllers/mypageCon");
const {uploadImg,updateProfileImg} = require("../middleware/uploadImg");

const path = require("path");

router.get("/",async (req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/mypage.html");
});

router.get("/mypost",isLogin,myPost);

router.get("/users",isLogin,mypage);

router.get("/edit",isLogin,(req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/editProfile.html");
});

router.post("/edit",isLogin, updateProfileImg.single("img"), editProfile);

// router.post("/editPic",isLogin,updateProfileImg.single("img"),(req,res)=>{
//     console.log(req);
// });

router.get("/testing",isLogin,mypage,(req,res)=>{
    // console.log("hi");
    // console.log(req.user);
    const users = req.user;
    // let arr = [];
    // users.forEach((el,index)=>{
    //     console.log(el.dataValues.nickname);
    //     arr.push(el.dataValues.nickname);
    // });
    // console.log(arr);
    res.json(users);
});

module.exports = router;