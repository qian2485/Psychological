let express = require("express");
let router = express.Router();

// 配置multer解析表单中的数据（重点图片数据）
var multer  = require('multer');
var path  = require('path');
var upload = multer({ dest: path.join(__dirname,"../uploads") })
1
let articleHandler = require('../constroller_handler/article');

// 导入数据校验的中间件
let expressJoi = require("@escook/express-joi")
// 导入校验规则对象
let { add_article_schema } = require("../schema/article")

// upload.single('cover_img') 是一个中间件，解析表单中的数据
// 如果是文本数据，解析后挂载到req.body上
// 如果是文件数据，解析后挂载到req.file上
// 增加文章
router.post("/add",upload.single('cover_img'),expressJoi(add_article_schema), articleHandler.addAricle)

module.exports = router;

