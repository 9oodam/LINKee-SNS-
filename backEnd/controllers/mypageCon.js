const {User,Post} = require("../models");

exports.myPost = async (req,res)=>{
    const {acc_decoded} = req;
    // console.log(acc_decoded);
    const {user_id} = acc_decoded;
    // console.log(user_id);
    
    try {
        const user = await User.findOne({where : {user_id}});
        // console.log(user);
        // console.log(user.id);
        const id = user.id;
        const posts = await Post.findAll({where : {user_id : id}});
        // console.log(posts);
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

exports.mypage = async (req,res)=>{
    try {
        const users = await User.findAll();
        // console.log(users[0]);
        res.json(users);
    } catch (error) {
        console.log(error);
    }
};

exports.editProfile = async (req,res)=>{
    try {
        const {nickname,profile_info} = req.body;
        const {acc_decoded} = req;
        const user_id = acc_decoded.user_id;
        console.log(acc_decoded);

        const user = await User.findOne({where : {user_id}});
        console.log(user);

        if(req.file == undefined){
            await User.update({
                nickname : nickname,
                profile_img : user.profile_img,
                profile_info : profile_info
            },
            {where : {user_id : user_id}});
        }else{
            await User.update({
                nickname : nickname,
                profile_img : req.file.filename,
                profile_info : profile_info
            },
            {where : {user_id : acc_decoded.user_id}});
        };

        res.redirect("/home/ubuntu/frontEnd/page/mypage.html");
    } catch (error) {
        console.log(error);
    };
};