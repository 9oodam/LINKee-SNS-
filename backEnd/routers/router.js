const router = require("express").Router();
const {User} = require("../models");
const {isLogin} = require("../middleware/middleware");
const {signUp1, login1, idCheck, nicknameCheck, loginalert, passwordalert, admin1, admin2, levelchange, deny, dayCnt, unAuth} = require("../controllers/controller");

router.post("/signUp", signUp1);


router.get("/signUp/idCheck/:id", idCheck);
router.get("/signUp/nicknameCheck/:id", nicknameCheck);

router.get("/signUp/loginalert/:id", loginalert);
router.get("/signUp/passwordalert", passwordalert);

// admin 
router.get("/admin1", admin1);
router.get("/admin2", admin2);
router.get("/levelchange/:id", levelchange);
router.get("/deny/:id", deny);

router.get("/dayCnt", dayCnt);
router.get("/unAuth/:id", unAuth);


// router.get("/login", login1);

module.exports = router;