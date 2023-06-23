const jwt = require("jsonwebtoken");

exports.isLogin = (req,res,next) =>{
    const {access_token} = req.session;
    // console.log(access_token);

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded)=>{
        if(err){
            res.sendFile("/home/ubuntu/frontEnd/page/login.html");
        }else{
            req.acc_decoded = acc_decoded;
            // 다음 미들웨어 실행
            // console.log(acc_decoded);
            next();
        }
    });
}