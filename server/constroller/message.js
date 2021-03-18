let express = require("express");
let router = express.Router();      //导入路由


//导入数据库操作
let messageHandle = require("../constroller_handler/message");
//导入数据校验中间件
let expressJoi = require("@escook/express-joi");
//导入校验规则对象
let { get_message_schema,get_message_by_id_schema,add_message_schema,update_message_schema,delete_message_schema } = require("../schema/message");


//获取留言板
router.get("/",expressJoi(get_message_schema),messageHandle.getMessage);

//根据id获取留言板详细内容
router.get("/getMessageById",expressJoi(get_message_by_id_schema),messageHandle.getMessageById);

//添加留言板具体内容
router.post("/add",expressJoi(add_message_schema),messageHandle.addMessage);

//更新留言板
router.post("/update",expressJoi(update_message_schema),messageHandle.updateMessageById);

//删除留言板 （不是物理意义上删除，只是隐藏不可见）
router.get("/delete",expressJoi(delete_message_schema),messageHandle.deleteMessageById);


module.exports = router;



