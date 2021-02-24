let express = require("express");
let router = express.Router();
// 导入constroller的处理函数
let userHandler = require('../constroller_handler/user');

// 导入数据校验的中间件
let expressJoi = require("@escook/express-joi")
// 导入校验规则对象
let { reg_login_schema } = require("../schema/user")

// 注册
router.post("/register",expressJoi(reg_login_schema), userHandler.regUser)
// 登录
router.post("/login",expressJoi(reg_login_schema), userHandler.login)

module.exports = router;






