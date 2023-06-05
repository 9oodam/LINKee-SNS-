const {User} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp1 = async (req,res)=>{
    try {
        const {user_id, user_name, nickname, user_pw} = req.body;
        const user = await User.findOne({where:{user_id:user_id}});
        if(user != null){
            return res.send("중복 회원가입임!");
        }
        const hash = bcrypt.hashSync(user_pw, 10);
        await User.create({
            user_id : user_id,
            user_name : user_name,
            nickname : nickname,
            user_pw : hash,
            user_id : user_id,
            level : 0,
            follower : 0,
            following : 0,
        });
        
        res.redirect("http://127.0.0.1:5500/frontEnd/page/login.html");
    } catch (error) {
        console.log(error);
    }
}

exports.login1 = async (req,res)=>{
    try {
        const {user_id, user_pw} = req.body;
        const user = await User.findOne({where:{user_id:user_id}});
        if(user == null){
            return res.send("가입 안한 아이디임!");
        }

        const same = bcrypt.compareSync(user_pw, user.user_pw);
        // const {name, age} = user;
        if(same){
            let token = jwt.sign({
                user_id,
            },process.env.ACCESS_TOKEN_KEY,{
                expiresIn : "60m"
            });
            req.session.access_token = token;
            req.session.user_id = user_id;
            return res.redirect("http://127.0.0.1:5500/frontEnd/page/main.html");
        }else{
            return res.send("비밀번호 틀림");
        }
    } catch (error) {
        console.log(error);
    }
}

