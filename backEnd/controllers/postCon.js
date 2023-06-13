const {Post} = require("../models");

exports.myPost = async (req,res,next)=>{
    const {acc_decoded} = req;
    const writer = acc_decoded.username;
    Post.findAll({
        where : {by : writer}
    }).then(posts=>{
        const post = posts.map(user => user.get({plain : true}));
        res.json(post);
        next();
    }).catch((error)=>{
        console.log(error);
        console.log("unable to show the table in controller");
    });
};