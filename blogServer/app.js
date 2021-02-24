let express = require("express");
let bodyParser = require('body-parser')
let path = require('path')
let joi = require('@hapi/joi')
let cors = require("cors");
let app = express();
// 配置跨域
app.use(cors());
// 配置body-paser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 配置托管静态资源
app.use(express.static(path.join(__dirname, './uploads') ));
// 封装res.send()  中间件   任何一个请求都要走我们的中间件
app.use(function (req,res,next) {
    res.ss = function (err,status=1) {
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
// unless({ path:[/^\/api/] })  不需要进行totken校验
// 以/auth开头（除了以/api开头），需要进行Token验证  有些接口只有校验成功后才能拿到数据
// app.use(expressJWT({secret:config.jwtSecretKey}).unless({ path:[/^\/api/] }))

// 引入二级路由模块
let userConstroller = require("./constroller/user");
app.use("/api",userConstroller);
// 引入二获取用户信息模块
let userInfoConstroller = require("./constroller/userinfo")
app.use("/auth",userInfoConstroller);
// 引入分类管理模块
let catsConstroller = require("./constroller/cats")
app.use("/cauth",catsConstroller);
// 引入文章管理模块
let articleConstroller = require("./constroller/article")
app.use("/cauth/article",articleConstroller);

// 错误处理中间件
app.use((err,req,res,next)=>{
    if(err.name === "UnauthorizedError"){
        return res.ss("身份验证失败")
    }
    if(err instanceof joi.ValidationError){
        return res.ss(err)
    }
    res.ss("未知错误")
})
app.listen(3000,()=>{
    console.log("3000 is running...")
})





