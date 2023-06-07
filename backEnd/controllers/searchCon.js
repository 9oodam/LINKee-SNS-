const {User, Post, LikePost} = require("../models");

exports.viewAllPost = async (req, res) => {
    try {
        const data = await Post.findAll();
        res.json(data);
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