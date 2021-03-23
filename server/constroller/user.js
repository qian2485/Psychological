let express = require("express");
let router = express.Router();      //导入路由

//导入数据库操作
let userHandle = require("../constroller_handler/user");
//导入数据校验中间件
let expressJoi = require("@escook/express-joi");
//导入校验规则对象
let { get_user_schema,get_user_by_id_schema,add_user_schema,update_user_schema,delete_user_schema } = require("../schema/user");


//获取专家信息列表
router.get("/",expressJoi(get_user_schema),userHandle.getUser);

//根据id获取专家详细信息
router.get("/getUserById",expressJoi(get_user_by_id_schema),userHandle.getUserById);

//添加专家信息具体内容
router.post("/add",expressJoi(add_user_schema),userHandle.addUser);

//更新专家信息
router.post("/update",expressJoi(update_user_schema),userHandle.updateUserById);

//删除心理测试 （不是物理意义上删除，只是隐藏不可见）
router.get("/delete",expressJoi(delete_user_schema),userHandle.deleteUserById);


module.exports = router;



