const router = require("express").Router();
const {signUp1, login1, idCheck, nicknameCheck, loginalert, passwordalert, admin1, admin2, levelchange, deny, dayCnt, unAuth} = require("../controllers/userCon");

const path = require("path");
router.get("/",(req,res)=>{
    const filePath = "/home/ubuntu/frontend/page/login.html";
    res.sendFile(filePath);
});

router.get("/loginalert/:id", loginalert);
router.get("/passwordalert", passwordalert);


module.exports = router;