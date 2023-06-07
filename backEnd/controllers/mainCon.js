const {User, Post, LikePost} = require("../models");

exports.viewPost = async (req, res) => {
    const {acc_decoded} = req;
    // console.log(acc_decoded);
    const {id,user_id} = acc_decoded;
    // console.log(id);

    try {
        const user = await User.findOne({where : {user_id}});
        // console.log(user);
        const following = user.following;
        // console.log(following);

        const data = [];

        // 잠시 주석처리 해놓을게용
        // following.forEach((e) => {
        //     const followingPost = Post.fineOne({where : {user_id : e}});
        //     data.push(followingPost);
        // });

        // console.log(data);

        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

exports.getProfile = async (req, res) => {
    const {acc_decoded} = req;
    const {user_id} = acc_decoded;

    try {
        const user = await User.findOne({where : {user_id}});
        // console.log("get: ", user);
        res.json(user);

    } catch (error) {
        console.log(error);
    }
}