let express = require("express");
let router = express.Router();      //导入路由

//导入数据库操作
let testHandle = require("../constroller_handler/test");
//导入数据校验中间件
let expressJoi = require("@escook/express-joi");
//导入校验规则对象
let { get_test_schema,get_test_by_id_schema,add_test_schema,delete_test_schema,update_test_schema } = require("../schema/test");


//获取心理测试数据
router.get("/",expressJoi(get_test_schema),testHandle.getTest);

//根据id获取心理测试详细内容
router.get("/getTestById",expressJoi(get_test_by_id_schema),testHandle.getTestById);

//添加心理测试具体内容
router.post("/add",expressJoi(add_test_schema),testHandle.addTest);

//更新心理测试
router.post("/update",expressJoi(update_test_schema),testHandle.updateTestById);

//删除心理测试 （不是物理意义上删除，只是隐藏不可见）
router.get("/delete",expressJoi(delete_test_schema),testHandle.deleteTestById);


module.exports = router;



