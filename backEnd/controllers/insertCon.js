const {User, Post} = require("../models");

exports.insertPost = async (req, res) => {
    console.log(req);
    const filename = req.file.filename;
    const {content} = req.body;
    const {user_id} = req.acc_decoded;
    
    console.log(filename);
    console.log(content);

    try {
        const user = await User.findOne({where : {user_id}});

        await Post.create({
            content : content,
            img : filename,
            user_id : user.id,
            likes : 0,
            view_cnt : 0
        });
        
    } catch (error) {
        console.log(error);
    }
}