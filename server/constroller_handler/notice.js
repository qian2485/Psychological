let db = require("../dao/config");
let path = require("path");

//显示公告数据
exports.getNotice = (req,res)=>{
    let sql = "select * from t_notice where is_delete=0 and is_state=0 order by note_id asc";
    db.query(sql,(err,result)=>{
        if(err) return res.message(err);
        res.send({
            status:0,
            message:"获取公告数据成功",
            data:result
        })
    })
}
//根据id获取公告文章
exports.getNoticeById = (req,res)=>{
    let sql = "select * from t_notice where note_id=?";
    db.query(sql,req.query.note_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.length !== 1) return res.message("根据id获取文章数据失败！");
        res.send({
            status:0,
            message:"根据id获取公告详细信息成功",
            data:result[0]
        })
    })
}

//增加公告数据
exports.addNotice = (req,res)=>{
    //准备入库的数据
    const articleInfo = {
        ...req.body
    }

    let sql = "insert into t_notice set ?";
    db.query(sql,articleInfo,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("添加公告失败");

        //添加文章成功
        res.message("添加公告成功",0);
    })

}

//发布公告
exports.publishNotice = (req,res)=>{
    let sql = "update t_notice set is_state=0 where note_id=?"
    db.query(sql,req.query.note_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("发布公告失败");

        //添加公告成功
        res.message("发布公告成功",0);
    })

}



//编辑文章数据 根据id先进行查找
exports.updateNoticeById = (req,res)=>{
    let sql = "update t_notice set note_title=?,note_content=?,note_createtime=?,note_publisher=?,is_state=? where note_id = ?";
    db.query(sql,[req.body.note_title,req.body.note_content,req.body.note_createtime,req.body.note_publisher,req.body.is_state,req.body.note_id],(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("修改公告失败");

        res.message("修改公告成功",0);
    })
}

//删除公告数据  根据id
exports.deleteNoticeById = (req,res)=>{
    let sql = "update t_notice set is_delete=1 where note_id = ?";
    db.query(sql,req.query.note_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("删除公告失败");

        res.message("删除公告成功",0);
    })
}