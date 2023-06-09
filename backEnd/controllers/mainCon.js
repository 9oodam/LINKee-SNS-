const {User, Post, LikePost} = require("../models");

exports.getPost = async (req, res) => {
    const {acc_decoded} = req;
    // console.log(acc_decoded);
    const user_id = acc_decoded.id;
    // console.log(id);
    // console.log(user_id);

    try {
        // 로그인 된 유저
        const user = await User.findOne({where : {user_id}});

        // 모든 유저
        const userAll = await User.findAll();

        // 로그인 된 유저가 팔로우 하고 있는 유저들
        const following = JSON.parse(user.following);

        // 팔로우 하고 있는 유저들의 게시글
        const followingPost = [];

        // for of : 순차적
        // forEach : 비순차적
        for await (const el of following) {
            const temp = await Post.findAll({ where: { user_id: el } });
            followingPost.push(...temp);
        }

        res.json({user, userAll, following, followingPost});
        
    } catch (error) {
        console.log(error);
    }
}


exports.getProfile = async (req, res) => {
    // console.log(req.acc_decoded);
    const {id} = req.acc_decoded;
    console.log(id);

    try {
        const user = await User.findOne({where : {user_id : id}});
        res.json(user);

    } catch (error) {
        console.log(error);
    }
}