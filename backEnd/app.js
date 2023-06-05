const express = require("express");
const path = require("path");
const cors = require("cors"); // front & back 연결

const {sequelize} = require("./models");


// router
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");

const mainRouter = require("./routers/mainRouter");

const app = express();

// localhost 포트번호와 연결
app.use(cors({
    origin : "http://127.0.0.1:5500",
    credentials : true
}));

// body-parser 사용
app.use(express.urlencoded({extended : false}));

// sequelize 연결
sequelize.sync({force : false}).then((e) => {
    console.log("Sequelize 연결 성공")
}).catch((err) => {
    console.log(err);
});


// 정적 폴더 경로
app.use("/post_img", express.static(path.join(__dirname, "post_img")));
app.use("/user_ing", express.static(path.join(__dirname, "user_img")));

// router 연결
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/main", mainRouter);



app.listen(8080, () => {
    console.log("server opened");
});