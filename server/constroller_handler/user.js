let db = require("../dao/config");
let path = require("path");

//显示专家信息列表
exports.getUser = (req,res)=>{
    let sql = "select * from t_user where is_delete=0 order by user_id asc";
    db.query(sql,(err,result)=>{
        if(err) return res.message(err);
        res.send({
            status:0,
            message:"获取专家列表成功",
            data:result
        })
    })
}
//根据id获取专家详细信息
exports.getUserById = (req,res)=>{
    let sql = "select * from t_user where user_id=?";
    db.query(sql,req.query.user_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.length !== 1) return res.message("根据id获取专家详细信息失败！");
        res.send({
            status:0,
            message:"根据id专家详细信息成功",
            data:result[0]
        })
    })
}

//添加专家信息数据
exports.addUser = (req,res)=>{

     //准备入库的数据
     const userInfo = {
        ...req.body
    }
    let sql = "insert into t_user set ?";
    db.query(sql,userInfo,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("添加专家信息失败");
        res.message("添加专家信息成功",0);
        
    })
}

//编辑专家数据 根据id先进行查找
exports.updateUserById = (req,res)=>{
    let sql = "update t_user set user_nickname=?,user_instro=?,user_sex=?,user_spe=?,user_phone=?,user_avatar=? where user_id = ?";
    db.query(sql,[req.body.user_nickname,req.body.user_instro,req.body.user_sex,req.body.user_spe,req.body.user_phone,req.body.user_avatar,req.body.user_id],(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("修改专家信息失败");

        res.message("修改专家信息成功",0);
    })
}

//删除专家信息  根据id
exports.deleteUserById = (req,res)=>{
    let sql = "update t_user set is_delete=1 where user_id = ?";
    db.query(sql,req.query.user_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("删除专家信息失败");

        res.message("删除专家信息成功",0);
    })
}