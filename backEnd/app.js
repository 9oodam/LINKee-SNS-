const express = require("express");
const path = require("path");
const cors = require("cors"); // front & back 연결
const dot = require("dotenv").config();
const session = require("express-session");

const {sequelize} = require("./models");
const socketio = requiire("socket.io");


// router
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const mainRouter = require("./routers/mainRouter");
const mypageRouter = require("./routers/mypageRouter");
const insertRouter = require("./routers/insertRouter");
const searchRouter = require("./routers/searchRouter");
const mypageRouter = require("./routers/mypageRouter");

const notiRouter = require("./routers/notiRouter");

const adminRouter = require("./routers/adminRouter");
const chatRouter = require("./routers/chat");

const app = express();

// view engine
app.set("view engine","html");
// view foler
app.set("views",path.join(__dirname,"..","frontEnd","page"));

// 파일형식별 미들웨어 세팅 (static path)
// css content type
app.use("/css",express.static(path.join(__dirname,"..","frontEnd","css"),{
    setHeaders : (res,filePath) => {
        if(path.extname(filePath) === ".css"){
            res.setHeader("Content-Type","text/css");
        }
    }
}));

// js content type
app.use("/js",express.static(path.join(__dirname,"..","frontEnd","js"),{
    setHeaders : (res,filePath) => {
        if(path.extname(filePath) === ".js"){
            res.setHeader("Content-Type","application/javascript");
        }
    }
}));

// image content type
app.use("/nav_icon_img",express.static(path.join(__dirname,"..","frontEnd","nav_icon_img"),{
    setHeaders : (res,filePath) => {
        if (path.extname(filePath) === ".png" ||
            path.extname(filePath) === ".webp" ||
            path.extname(filePath) === ".jpg" ||
            path.extname(filePath) === ".jpeg" ||
            path.extname(filePath) === ".gif"){
            res.setHeader("Content-Type","image/jpeg");
        }
    }
}));

app.use("/user_img",express.static(path.join(__dirname,"user_img"),{
    setHeaders : (res,filePath) => {
        if (path.extname(filePath) === ".png" ||
            path.extname(filePath) === ".webp" ||
            path.extname(filePath) === ".jpg" ||
            path.extname(filePath) === ".jpeg" ||
            path.extname(filePath) === ".gif"){
            res.setHeader("Content-Type","image/jpeg");
        }
    }
}));

app.use("/post_img",express.static(path.join(__dirname,"post_img"),{
    setHeaders : (res,filePath) => {
        if (path.extname(filePath) === ".png" ||
            path.extname(filePath) === ".webp" ||
            path.extname(filePath) === ".jpg" ||
            path.extname(filePath) === ".jpeg" ||
            path.extname(filePath) === ".gif"){
            res.setHeader("Content-Type","image/jpeg");
        }
    }
}));

// image content type
app.use("/socket.io",express.static(path.join(__dirname,"..","frontEnd","js"),{
    setHeaders : (res,filePath) => {
        if(path.extname(filePath) === ".js"){
            res.setHeader("Content-Type","application/javascript");
        }
    }
}));

// localhost 포트번호와 연결
app.use(cors({
    origin : "http://andybyungjoopark.com",
    credentials : true
}));

// body-parser 사용
app.use(express.urlencoded({extended : false}));


// session 사용
app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : false
}));

// sequelize 연결
sequelize.sync({force : false}).then((e) => {
    console.log("Sequelize 연결 성공")
}).catch((err) => {
    console.log(err);
});


// 정적 폴더 경로
app.use("/post_img", express.static(path.join(__dirname, "post_img")));
app.use("/user_img", express.static(path.join(__dirname, "user_img")));


// router 연결
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/main", mainRouter);
app.use("/mypage",mypageRouter);
app.use("/insert", insertRouter);
app.use("/search", searchRouter);
app.use("/mypage",mypageRouter);
app.use("/noti", notiRouter);
app.use("/admin", adminRouter);
app.use("/chat",chatRouter);

app.listen(8080, () => {
    console.log("server opened");
});