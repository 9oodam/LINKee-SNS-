const {User, Post, LikePost} = require("../models");

exports.getPost = async (req, res) => {
    const {user_id} = req.acc_decoded;
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
        if(following.length != 0) {
            for (const el of following) {
                const temp = await Post.findAll({ where: { user_id: el } });
                followingPost.push(...temp);
            }
        }

        res.json({user, userAll, following, followingPost});
        
    } catch (error) {
        console.log(error);
    }
}


exports.getProfile = async (req, res) => {
    const {user_id} = req.acc_decoded;

    try {
        const user = await User.findOne({where : {user_id}});
        res.json(user);

    } catch (error) {
        console.log(error);
    }
}