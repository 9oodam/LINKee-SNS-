const {User, Post} = require("../models");

exports.insertPost = async (req, res) => {
    // console.log(req.file.filename);
    // const filename = req.file.filename;
    const {img, content} = req.body;
    const {user_id} = req.acc_decoded;

    try {
        const user = await User.findOne({where : {user_id}});

        await Post.create({
            content : content,
            img : img,
            user_id : user.id,
            likes : 0,
            view_cnt : 0
        });
        res.redirect("http://127.0.0.1:5500/frontEnd/page/main.html");
    } catch (error) {
        console.log(error);
    }
}