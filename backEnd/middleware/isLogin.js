const jwt = require("jsonwebtoken");

exports.isLogin = (req,res,next) =>{
    const {access_token} = req.session;
<<<<<<< HEAD
    // console.log("access_token: ", access_token);
=======
    // console.log(access_token);
>>>>>>> e85b34041a5cc60ec18f7b208b4e80b2a5ce75a6

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded)=>{
        if(err){
            res.send("다시 로그인 해주세요");
        }else{
            req.acc_decoded = acc_decoded;
            // 다음 미들웨어 실행
            // console.log(acc_decoded);
            next();
        }
    });
}