const {User, Post, LikePost} = require("../models");

exports.viewAll = async (req, res) => {
    try {
        const users = await User.findAll({where : {level : 1}});
        const posts = await Post.findAll();

        res.json({users, posts});
    } catch (error) {
        console.log(error);
    }
}

exports.searchThings = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
    }
}