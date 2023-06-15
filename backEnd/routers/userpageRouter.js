const router = require("express").Router();
const {isLogin} = require("../middleware/isLogin");

router.get("/:id",isLogin,(req,res)=>{
    res.sendFile("/home/ubuntu/frontEnd/page/search.html");
});

module.exports = router;