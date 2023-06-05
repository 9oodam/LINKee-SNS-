const router = require("express").Router();
const {login1} = require("../controllers/userCon");

router.post("/", login1);

module.exports = router;