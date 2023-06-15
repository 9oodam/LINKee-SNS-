const {User, Livechat} = require("../models");

exports.loginUser = async (req, res) => {
    const {user_id} = req.acc_decoded;
    try {
        const user = await User.findOne({where : {user_id}});
        const userAll = await User.findAll();

        res.json({user, userAll});
    } catch (error) {
        console.log(error);
    }
}