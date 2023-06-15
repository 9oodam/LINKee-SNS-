const express = require("express");
const path = require("path");
const cors = require("cors"); // front & back 연결
const dot = require("dotenv").config();
const session = require("express-session");
const socketIo = require("socket.io");

const {sequelize} = require("./models");


// router
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");

const mainRouter = require("./routers/mainRouter");
const insertRouter = require("./routers/insertRouter");
const searchRouter = require("./routers/searchRouter");
const mypageRouter = require("./routers/mypageRouter");

const notiRouter = require("./routers/notiRouter");
const livechatRouter = require("./routers/livechatRouter");

const adminRouter = require("./routers/adminRouter");

const app = express();

// localhost 포트번호와 연결
app.use(cors({
    origin : "http://127.0.0.1:5500",
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
app.use("/insert", insertRouter);
app.use("/search", searchRouter);
app.use("/mypage",mypageRouter);
app.use("/noti", notiRouter);
app.use("/chat", livechatRouter);
app.use("/admin", adminRouter);


// app.use('/socket.io', express.static(__dirname + 'node_modules/socket.io/client-dist'));

const server = app.listen(8080, () => {
    console.log("server opened");
});

const io = socketIo(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

let socketID = [];
let userID = [];

io.on("connection", (socket) => {
    socketID.push(socket.id);
    console.log("접속 중인 유저의 소켓 아이디 : ", socketID);

    // 접속 중인 유저
    socket.on("userIn", (id) => {
        userID.push(id);
        console.log("접속 중인 유저 아이디 : ", userID);
        io.emit("userIn", socketID, userID);
    });

    // 유저 연결 해제
    socket.on("disconnect", () => {
        let index = socketID.indexOf(socket.id);
        console.log(userID);
        console.log(index);
        console.log("유저 연결 해제 : ", userID[index], socket.id);

        socketID = socketID.filter((value) => value != socket.id);
        userID = userID.filter((value) => value != userID[index]);

        console.log(socketID);
        console.log(userID);

        io.emit("userIn", socketID, userID);
    });
});