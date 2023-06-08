const {User, Post, LikePost} = require("../models");

exports.getPost = async (req, res) => {
    const {acc_decoded} = req;
    // console.log(acc_decoded);
    const {id,user_id} = acc_decoded;
    // console.log(id);

    try {
        // 로그인 된 유저
        const user = await User.findOne({where : {user_id}});
        // console.log(user);
        const following = user.following;
        // console.log(following);

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
    const {acc_decoded} = req;
    const {user_id} = acc_decoded;

    try {
        const user = await User.findOne({where : {user_id}});
        // console.log("get: ", user);
        // console.log(user);
        res.json(user);

    } catch (error) {
        console.log(error);
    }
}