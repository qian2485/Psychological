let db = require("../dao/index")
let path = require("path");
exports.addAricle = (req,res)=>{
    // 如果数据校验OK，代码就走到此处...
    if(!req.file || req.file.fieldname !== "cover_img") return res.ss("文章的封面是必传项");

    // 准备需要入库的数据
    const articleInfo = {
        ...req.body,
        cover_img:path.join("/uploads",req.file.filename),
        pub_date:new Date(),
        author_id:req.user.id
    }
    // 准备sql语句
    let sql = "insert into article set ?"
    db.query(sql,articleInfo,(err,result)=>{
        if(err) return res.ss(err);
        if(result.affectedRows !== 1) return res.ss("发布文章失败！")
        res.ss("发布文章成功",0)
    })
}




