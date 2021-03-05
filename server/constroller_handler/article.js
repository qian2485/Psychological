let db = require("../dao/config");
let path = require("path");

//显示文章数据
exports.getArticle = (req,res)=>{
    let sql = "select * from t_article where is_delete=0 order by id asc";
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
            message:"根据id获取文章具体信息成功",
            data:result[0]
        })
    })
}

//增加文章数据
exports.addArticle = (req,res)=>{
    //校验ok

    //准备入库的数据
    const articleInfo = {
        ...req.body,
        art_cover:path.join("/public/upload",req.file.filename),
        art_create:new Date()
    }

    let sql = "insert into t_article set = ?";
    db.query(sql,articleInfo,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("添加文章失败");

        //添加文章成功
        res.message("添加文章成功",0);
    })

}


//编辑文章数据 根据id先进行查找
exports.updateArticleById = (req,res)=>{
    let sql = "update t_article set title=?,content=? where id = ?";
    db.query(sql,[req.body.art_title,req.body.art_content,req.body.art_auth_name],(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("修改文章失败");

        res.message("修改文章成功",1);
    })
}

//删除文章数据