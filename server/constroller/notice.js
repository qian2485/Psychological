let express = require("express");
let router = express.Router();      //导入路由

let path = require("path");

//导入数据库操作
let noticeHandle = require("../constroller_handler/notice");
//导入数据校验中间件
let expressJoi = require("@escook/express-joi");
//导入校验规则对象
let { get_notice_schema,get_notice_by_id_schema,add_notice_schema,update_notice_schema,delete_notice_schema,publish_notice_schema } = require("../schema/notice");


//获取公告
router.get("/",expressJoi(get_notice_schema),noticeHandle.getNotice);

//根据id获取文章详细内容
router.get("/getNoticeById",expressJoi(get_notice_by_id_schema),noticeHandle.getNoticeById);

//添加公告具体内容
router.post("/add",expressJoi(add_notice_schema),noticeHandle.addNotice);

//更新文章
router.post("/update",expressJoi(update_notice_schema),noticeHandle.updateNoticeById);

//删除文章 （不是物理意义上删除，只是隐藏不可见）
router.get("/delete",expressJoi(delete_notice_schema),noticeHandle.deleteNoticeById);

//发布文章
router.post("/publish",expressJoi(publish_notice_schema,noticeHandle.publishNotice));


module.exports = router;



