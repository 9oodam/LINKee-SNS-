const {Post} = require("../models");

exports.myPost = async (req,res)=>{
    const {acc_decoded} = req;
    const {id} = acc_decoded;
    Post.findAll({
        where : {user_id : id}
    }).then(posts=>{
        const post = posts.map(user => user.get({plain : true}));
        res.json(post);
    }).catch((error)=>{
        console.log(error);
        console.log("unable to show the table in controller");
    });
};