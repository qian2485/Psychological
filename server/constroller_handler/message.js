let db = require("../dao/config");

//显示留言板数据
exports.getMessage = (req,res)=>{
    let sql = "select * from t_message where is_delete=0 order by mes_id asc";
    db.query(sql,(err,result)=>{
        if(err) return res.message(err);
        res.send({
            status:0,
            message:"获取留言板数据成功",
            data:result
        })
    })
}
//根据id获取留言板内容
exports.getMessageById = (req,res)=>{
    let sql = "select * from t_message where mes_id=?";
    db.query(sql,req.query.mes_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.length !== 1) return res.message("根据id获取留言板数据失败！");
        res.send({
            status:0,
            message:"根据id获取留言板信息成功",
            data:result[0]
        })
    })
}

//添加留言板数据(管理员和用户添加)
exports.addMessage = (req,res)=>{
     //准备入库的数据
     const messageInfo = {
        ...req.body
    }

    let sql = "insert into t_message set ?";
    db.query(sql,messageInfo,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("添加留言板失败");
        res.message("添加留言板成功",0);
        
    })
}

//编辑心留言板数据 根据id先进行查找
exports.updateMessageById = (req,res)=>{
    let sql = "update t_message set mes_author=?,mes_title=?,mes_content=? where mes_id = ?";
    db.query(sql,[req.body.mes_author,req.body.mes_title,req.body.mes_content,req.body.mes_id],(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("修改留言板数据失败");

        res.message("修改留言板成功",0);
    })
}

//删除留言板数据  根据id
exports.deleteMessageById = (req,res)=>{
    let sql = "update t_message set is_delete=1 where mes_id = ?";
    db.query(sql,req.query.mes_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("删除留言板失败");

        res.message("删除留言板数据成功",0);
    })
}