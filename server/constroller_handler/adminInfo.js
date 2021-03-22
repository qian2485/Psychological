let db = require("../dao/config");
let bcryptjs = require("bcryptjs");

//获取用户名
exports.getAdminInfo = (req,res)=>{
    //获取用户名
    let sql = "select * from t_admin where id=?";
    db.query(sql,req.user.id,function(err,result){
        if(err) return res.message(err);
        if(result.length !== 1) return res.message("获取管理员信息失败");
        res.send({
            status:0,
            message:"获取管理员信息成功",
            data:result[0]
        })
    })
}

//管理员修改账户密码
exports.updateAdminPassword = (req,res)=>{
    let sql = "select * from t_admin where id=?";
    db.query(sql,req.user.id,(err,result)=>{
        if(err) return res.message(err)
        if(result.length !== 1) return res.message("用户不存在!")

        // 判断旧密码是否正确
        let compareRes = bcryptjs.compareSync(req.body.oldPwd,result[0].password);
        if(!compareRes) return res.message("原密码输入错误");

        // 如果旧密码正确，新密码加密码，入库
        let newPwd = bcryptjs.hashSync(req.body.newPwd,10);

        // 准备sql
        let sqlStr = "update t_admin set password=? where id=?"
        db.query(sqlStr,[newPwd,req.user.id],(err,result)=>{
            if(err) return res.message(err); // 执行SQL语句失败
            if(result.affectedRows !== 1) return res.message("更新密码失败");
            // 成功
            res.message("更新密码成功",0)
        })

    })
}

//管理员修改头像
exports.updateAdminAvatar = (req,res)=>{
    let sql = "update t_admin set avatar=? where id=?";
    db.query(sql,[req.body.avatar,req.user.id],(err,result)=>{
        if(err) return res.message(err)
        if(result.affectedRows !== 1) return res.message("更新头像失败")
        return res.message("更新头像成功",0);
    })
}