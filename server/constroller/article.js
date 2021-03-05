let express = require("express");
let router = express.Router();      //导入路由

//配置multer解析表单中的数据（重点图片数据）
let multer = require("multer");
let path = require("path");
let upload = multer({ dest:path.join(__dirname,"../public/upload") })

//导入数据库操作
let articleHandle = require("../constroller_handler/article");
//导入数据校验中间件
let expressJoi = require("@escook/express-joi");
//导入校验规则对象
let { add_article_schema,get_article_schema,get_article_by_id_schema,update_article_schema,delete_article_schema } = require("../schema/article");

//upload.single('cover_img')是一个中间件，解析表单中的数据
//如果是文本数据，解析后挂载到req.body上
//如果是文件数据，解析后挂载到req.file上

//获取文章
router.get("/",expressJoi(get_article_schema),articleHandle.getArticle)

module.exports = router;



