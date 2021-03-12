let db = require("../dao/config");
let path = require("path");
const { read } = require("fs");

//显示文章数据
exports.getArticle = (req,res)=>{
    let sql = "select * from t_article where is_delete=0 order by art_id asc";
    db.query(sql,(err,result)=>{
        if(err) return res.message(err);
        res.send({
            status:0,
            message:"获取文章数据成功",
            data:result
        })
    })
}
//根据id获取具体文章
exports.getArticleById = (req,res)=>{
    let sql = "select * from t_article where art_id=?";
    db.query(sql,req.query.art_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.length !== 1) return res.message("根据id获取文章数据失败！");
        res.send({
            status:0,
            message:"根据id获取文章详细信息成功",
            data:result[0]
        })
    })
}

//增加文章数据
exports.addArticle = (req,res)=>{
    //校验ok
    if(!req.file || req.file.filedname !== "art_cover") res.message("文章封面是必传项");

    //准备入库的数据
    const articleInfo = {
        ...req.body,
        art_cover:path.join("../public/upload/article",req.file.filedname),
        art_createtime:new Date()
    }

    let sql = "insert into t_article set ?";
    db.query(sql,articleInfo,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("添加文章失败");

        //添加文章成功
        res.message("添加文章成功",0);
    })

}


//编辑文章数据 根据id先进行查找
exports.updateArticleById = (req,res)=>{
    let sql = "update t_article set art_title=?,art_content=?,art_createtime=?,art_cover=?,art_auth_name=? where art_id = ?";
    db.query(sql,[req.body.art_title,req.body.art_content,req.body.art_createtime,req.body.art_cover,req.body.art_auth_name,req.body.art_id],(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("修改文章失败");

        res.message("修改文章成功",0);
    })
}

//删除文章数据  根据id
exports.deleteArticleById = (req,res)=>{
    let sql = "update t_article set is_delete=1 where art_id = ?";
    db.query(sql,req.query.art_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("删除文章分类失败");

        res.message("删除文章分类成功",0);
    })
}