const router = require("express").Router();
const {signUp1} = require("../controllers/userCon");

router.post("/", signUp1);

module.exports = router;