let express = require("express");
let  router = express.Router();
//导入constroller的处理函数
let adminHandler = require("../constroller_handler/admin");
// 导入数据校验的中间件
let expressJoi = require("@escook/express-joi")
//导入数据校验中间件
let { login_admin_schema,reg_admin_schema,update_password_schema,update_avatar_schema } = require("../schema/admin");
//注册
router.post("/register",expressJoi(reg_admin_schema),adminHandler.regAdmin);
//登录
router.post("/login",expressJoi(login_admin_schema),adminHandler.loginAdmin);
//修改密码
router.post("/updatepwd",expressJoi(update_password_schema),adminHandler.updateAdminPassword);

module.exports = router;



