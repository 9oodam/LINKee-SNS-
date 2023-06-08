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

        following.forEach(async (el) => { 
            console.log(el,'js and el')           
            const temp = await Post.findAll({ where: { user_id: el } });
            const tempArray=temp.map((a)=>{
            return a.dataValues;
            })
            followingPost.push(tempArray);
            console.log(followingPost,'tempArray')
        });


        console.log(followingPost,'asdasdads');
        /*
        following.forEach((e) => {
            const temp = Post.findOne({where : {user_id : e}});
            followingPost.push(temp);
        });
        */
        setTimeout(()=>{
            res.json({user, following, followingPost});
        },10);
        
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