let db = require("../dao/index")
let bcryptjs = require("bcryptjs")

// 获取用户信息
exports.getUserInfo = (req,res)=>{
    // 获取用户名（ID）    根据用户名去数据库中找到此用户的用户信息
    var  sql = 'SELECT * FROM user where id=?';
    // req.user.id  只要配置了express-jwt中间件，那么token中的用户信息就挂载到了req.user上
    // req.body.username  只要配置了body-parser中间件，那么from表单中的数据就挂载到了req.body上
    db.query(sql, req.user.id, function (err, result) {
        if(err) return res.ss(err); // sql语句执行失败 return 结束程序
        if(result.length !== 1) return res.ss("获取用户信息失败~")
        res.send({
            status:0,
            message:"获取用户信息成功",
            data:result[0]
        });
    });
}

// 修改用户的基本信息
exports.updateUserInfo = (req,res)=>{
    // 准备sql语句
    var sql = 'UPDATE user SET nickname = ?,email = ? WHERE id = ?';
    var modSqlParams = [req.body.nickname, req.body.email, req.user.id];
    db.query(sql,modSqlParams,function (err, result) {
        if(err) return res.ss(err);
        if(result.affectedRows !== 1) return res.ss("更新用户基本信息失败")
        res.ss("更新用户信息成功",0);
    });
}

// 修改密码
exports.updatePassword = (req,res)=>{
    let sql = "select * from user where id=?";
    db.query(sql,req.user.id,(err,result)=>{
        if(err) return res.ss(err)
        if(result.length !== 1) return res.ss("用户不存在!")

        // 判断旧密码是否正确
        let compareRes = bcryptjs.compareSync(req.body.oldPwd,result[0].password);
        if(!compareRes) return res.ss("原密码输入错误")

        // 如果旧密码正确，新密码加密码，入库
        let newPwd = bcryptjs.hashSync(req.body.newPwd,10);
        // 准备sql
        let sqlStr = "update user set password=? where id=?"
        db.query(sqlStr,[newPwd,req.user.id],(err,result)=>{
            if(err) return res.ss(err); // 执行SQL语句失败
            if(result.affectedRows !== 1) return res.ss("更新密码失败");
            // 成功
            res.ss("更新密码成功",0)
        })
    })


}

// 修改用户头像
exports.updateAvatar = (req,res)=>{
    // 实现更新用户头像的功能
    // 准备一个sql语句
    let sql = "update user set user_intro=? where id=?"
    db.query(sql,[req.body.avatar,req.user.id],(err,result)=>{
        if(err) return res.ss(err)
        if(result.affectedRows !== 1) return res.ss("更新头像失败")
        return res.ss("更新头像成功",0);
    })
}

