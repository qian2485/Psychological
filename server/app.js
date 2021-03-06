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
// unless({ path:[/^\/api/] })  不需要进行totken校验
// 以/auth开头（除了以/api开头），需要进行Token验证  有些接口只有校验成功后才能拿到数据
app.use(expressJWT({secret:config.jwtSecretKey,algorithms: ['HS256']}).unless({ path:[/^\/api/] }));

//引入二级路由
//登录注册  用户信息获取模块
let adminConstroller = require("./constroller/admin");
app.use("/api",adminConstroller);

//用户信息管理模块
let adminIfoConstroller = require("./constroller/adminInfo");
app.use("/admin",adminIfoConstroller);

//文章模块
let articleConstroller = require("./constroller/article");
app.use("/article",articleConstroller);
//公告模块
let noticeHandle = require("./constroller/notice");
app.use("/notice",noticeHandle);
//心理测试模块
let testHandle = require("./constroller/test");
app.use("/test",testHandle);
//留言板模块
let messageHandle = require("./constroller/message");
app.use("/message",messageHandle);
//专家信息模块
let userHandle = require("./constroller/user");
app.use("/user",userHandle);





//错误处理中间件
app.use((err,req,res,next)=>{
    if(err.name === "UnauthorizedError"){
        return res.message("身份验证失败");
    }
    if(err instanceof joi.ValidationError){
        return res.message(err);
    }
    res.message("未知错误~");
})

app.listen(3000,()=>{
    console.log("3000 is running");
})