const {User, Post, LikePost} = require("../models");

exports.getPost = async (req, res) => {
    const {user_id} = req.acc_decoded;
    try {
        // 로그인 된 유저
        const user = await User.findOne({where : {user_id}});
        console.log(user);

        // 로그인 된 유저가 팔로우 하고 있는 유저들
        const following = JSON.parse(user.following);
        console.log(following); // 배열로 받아와 지는지 확인 [2, 3]

        // 팔로우 하고 있는 유저들의 게시글
        const followingPost = [];

        // for of : 순차적
        // forEach : 비순차적
        for (const el of following) {
            const temp = await Post.findAll({ where: { user_id: el } });
            // const tempArray=temp.map((a)=>{
            // return a.dataValues;
            // })
            followingPost.push(temp);
        }

        res.json({user, following, followingPost});
        
    } catch (error) {
        console.log(error);
    }
}


exports.getProfile = async (req, res) => {
    console.log(req.acc_decoded);
    const {id} = req.acc_decoded;

    try {
        const user = await User.findOne({where : {id}});
        res.json(user);

    } catch (error) {
        console.log(error);
    }
}