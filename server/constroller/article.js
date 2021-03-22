let express = require("express");
let router = express.Router();      //导入路由

//配置multer解析表单中的数据（重点图片数据）
let multer = require("multer");
let path = require("path");
let upload = multer({ dest:path.join(__dirname,"../public/upload/article") })

//导入数据库操作
let articleHandle = require("../constroller_handler/article");
//导入数据校验中间件
let expressJoi = require("@escook/express-joi");
//导入校验规则对象
let { add_article_schema,get_article_schema,get_article_by_id_schema,update_article_schema,delete_article_schema } = require("../schema/article");



//获取文章
router.get("/",expressJoi(get_article_schema),articleHandle.getArticle);

//根据id获取文章详细内容
router.get("/getArticleById",expressJoi(get_article_by_id_schema),articleHandle.getArticleById);

//添加文章具体内容
//upload.single('cover_img')是一个中间件，解析表单中的数据
//如果是文本数据，解析后挂载到req.body上
//如果是文件数据，解析后挂载到req.file上
router.post("/add",upload.single('art_cover'),expressJoi(add_article_schema),articleHandle.addArticle);


//更新文章
router.post("/update",expressJoi(update_article_schema),articleHandle.updateArticleById);

//删除文章 （不是物理意义上删除，只是隐藏不可见）
router.get("/delete",expressJoi(delete_article_schema),articleHandle.deleteArticleById);


//上传图片
// router.post("/upload",article_img_up.single('art_cover'), expressJoi(upload_img_schema),(req,res,next)=>{
//     res.json({
//         status:0,
//         messge:'图片上传成功',
//     })
// });

module.exports = router;



