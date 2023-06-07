const {User, Post, LikePost} = require("../models");

exports.viewPost = async (req, res) => {
    const {user_id} = req.acc_decoded;

    try {
        const user = await User.findOne({where : {user_id}});
        // console.log(user);
        const following = user.following;
        // console.log(following);

        const data = [];

        following.forEach((e) => {
            const followingPost = Post.fineOne({where : {user_id : e}});
            data.push(followingPost);
        });

        // console.log(data);

        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

exports.getProfile = async (req, res) => {
    console.log(req.acc_decoded);
    const {user_id} = req.acc_decoded;

    try {
        const user = await User.findOne({where : {user_id}});
        res.json(user);

    } catch (error) {
        console.log(error);
    }
}