const {User,Post} = require("../models");

exports.myPost = async (req,res)=>{
    const {acc_decoded} = req;
    const {user_id} = acc_decoded;
    
    try {
        const user = await User.findOne({where : {user_id}});
        const posts = await Post.findAll({where : {user_id : user.id}});
        const data = posts.map((user)=>user.get({plain : true}));

        // console.log(user.user_id);

        const response = {
            data : data,
            user : user
        };
        res.json(response);
    } catch (error) {
        console.log(error);
        console.log("Unable to show the table in the controller");
    }
};

exports.follow = async (req, res) => {
    const {user_id} = req.acc_decoded; // 로그인 한 유저
    const {id} = req.params; // 로그인 한 유저가 팔로우 한 유저
    try {
        const loginUser = await User.findOne({where : {user_id}});
        const targetUser = await User.findOne({where : {id}});

        let followingArr = JSON.parse(loginUser.following);
        let followerArr = JSON.parse(targetUser.follower);
        //console.log("로그인 유저의 following : ", followingArr)
        //console.log("타겟 유저의 follower : ", followerArr);

        if(loginUser.following == 0) {
            followingArr = [targetUser.id];
        }else {
            if(followingArr.includes(targetUser.id)) {
                let index = followingArr.indexOf(targetUser.id);
                followingArr.splice(index, 1); // 이미 배열에 있으면 빼내기 == 팔로우 취소
            }else {
                followingArr.push(targetUser.id); // 배열에 없으면 넣기 == 팔로우
            }
        }

        if(targetUser.follower == 0) {
            followerArr = [loginUser.id];
        }else {
            if(followerArr.includes(loginUser.id)) {
                let index = followingArr.indexOf(loginUser.id);
                followerArr.splice(index, 1); // 이미 배열에 있으면 빼내기 == 팔로우 취소            }else {
            }else {
                followerArr.push(loginUser.id)
            }
        }
        //console.log("로그인 유저의 following : ", followingArr);
        //console.log("타겟 유저의 follower : ", followerArr);

        let followingArrArr = JSON.stringify(followingArr)
        let followerArrArr = JSON.stringify(followerArr)

        await User.update({following : followingArrArr}, {where : {id : loginUser.id}});
        await User.update({follower : followerArrArr}, {where : {id : targetUser.id}});
    } catch (error) {
        console.log(error);
    }
}