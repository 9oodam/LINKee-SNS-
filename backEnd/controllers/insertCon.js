const {User, Post} = require("../models");

exports.insertPost = async (req, res) => {
    try {
        const {content} = req.body;
        const {user_id} = req.acc_decoded;
        const user = await User.findOne({where : {user_id}});

        if(req.file == undefined) {
            await Post.create({
                content : content,
                img : "",
                user_id : user.id,
                likes : 0,
                view_cnt : 0
            });
        }else {
            await Post.create({
                content : content,
                img : req.file.filename,
                user_id : user.id,
                likes : 0,
                view_cnt : 0
            });
        }

    } catch (error) {
        console.log(error);
    }
}

// exports.getOriginalPost = async (req, res) => {
//     const {id} = req.params; // posts.id
//     try {
//         const post = await Post.findOne({where : {id}});

//         res.json(post);
        
//     } catch (error) {
//         console.log(error);
//     }
// }