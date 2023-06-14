const {User, Post, LikePost} = require("../models");
const {Op} = require("sequelize");

exports.viewAll = async (req, res) => {
    try {
        const users = await User.findAll({where : {level : 1}});
        const posts = await Post.findAll();

        res.json({users, posts});
    } catch (error) {
        console.log(error);
    }
}

exports.searchName = async (req, res) => {
    const {user_id} = req.acc_decoded;
    console.log(user_id);
    const {nickname} = req.body;
    console.log("검색한 닉네임 : ", nickname);

    try {
        const user = await User.findOne({where : {nickname}});

        if(user_id == user.user_id) {
            // 검색한 이름과 로그인 된 유저 이름이 동일하면 마이페이지로 이동
            res.redirect("http://127.0.0.1:5500/frontEnd/page/mypage.html");
        }else {
            // 검색한 유저 페이지로 이동
            res.redirect("http://127.0.0.1:5500/frontEnd/page/userpage.html");
        }
    } catch (error) {
        console.log(error);
    }
}

exports.searchTag = async (req, res) => {
    const {tag} = req.body;
    const tagLength = tag.length;
    console.log(tag);
    console.log(tagLength);

    try {
        const posts = await Post.findAll({where: {content: {[Op.like]: `%#${tag} %`,}}});
        const userAll = await User.findAll();

    } catch (error) {
        console.log(error);
    }
}