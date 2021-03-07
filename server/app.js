let express = require("express");
let bodyParser = require("body-parser")
let path = require('path')
let joi = require('@hapi/joi')
let cors = require("cors");
let app = express();
//配置跨域
app.use(cors());
// 配置body-paser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//配置静态资源
app.use(express.static(path.join(__dirname, './public') ));
// 封装res.send()  中间件   任何一个请求都要走我们的中间件
app.use(function (req,res,next) {
    res.message = function (err,status=1) {
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next();
})

// 一定要在路由之前进行配置
let expressJWT = require("express-jwt");
let config = require("./config");

//引入二级路由
//文章模块
let articleConstroller = require("./constroller/article");
app.use("/article",articleConstroller);
//公告模块
let noticeHandle = require("./constroller/notice");
app.use("/notice",noticeHandle);






app.listen(3000,()=>{
    console.log("3000 is running");
})