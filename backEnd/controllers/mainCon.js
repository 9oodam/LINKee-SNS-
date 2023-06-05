const {User, Post, LikePost} = require("../models");

exports.viewPost = async (req, res) => {
    const {user_id} = acc.decoded;

    try {
        const user = await User.findOne({where : {user_id}});
    } catch (error) {
        console.log(error);
    }
}