let express = require("express");
let router = express.Router();
//导入需要校验的数据
let expressJoi = require("@escook/express-joi");
//导入需要校验的对象
let { update_avatar_schema,update_password_schema } = require("../schema/admin");

//获取用户信息处理函数
let admininfoHandle = require("../constroller_handler/adminInfo");
//获取用户的基本信息
router.get("/admininfo",admininfoHandle.getAdminInfo);
//修改管理员密码
router.post("/updatePwd",expressJoi(update_password_schema),admininfoHandle.updateAdminPassword);
//修改用户头像
router.post("/updateAvatar",expressJoi(update_avatar_schema),admininfoHandle.updateAdminAvatar);

module.exports = router;