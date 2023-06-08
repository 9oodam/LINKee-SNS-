const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dot = require("dotenv").config();
const session = require("express-session");
const {sequelize} = require("./models");
const mainRouter = require("./routers/router");

app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : false
}));

sequelize.sync({force: false}).then(()=>{
    console.log("연결 성공");
}).catch((err)=>{
    console.log(err);
});

app.use(cors({
    // 프론트 엔드 배포할 주소
    origin : "http://127.0.0.1:5500",
    credentials : true
}))

app.use(express.urlencoded({extended:false}));

// app.use(express.json());
app.use("/", mainRouter);


app.listen(8000, ()=>{
    console.log("server on");
});



