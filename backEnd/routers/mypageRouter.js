const router = require("express").Router();

const {isLogin} = require("../middleware/isLogin");
const {myPost} = require("../controllers/postCon");

router.get("/",isLogin,myPost);

module.exports = router;