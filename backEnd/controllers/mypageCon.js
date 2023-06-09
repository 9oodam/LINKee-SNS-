const {User,Post} = require("../models");

exports.myPost = async (req,res)=>{
    const {acc_decoded} = req;
    const {id,user_id} = acc_decoded;
    console.log(user_id);
    
    try {
        const posts = await Post.findAll({where : {user_id : id}});
        const data = posts.map((user)=>user.get({plain : true}));

        const user = await User.findOne({where : {user_id}});
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