const router = require("express").Router();
const {isLogin} = require("../middleware/isLogin");

router.get("/",isLogin,(req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/userpage.html");
});

router.post("/follow",isLogin,)

module.exports = router;