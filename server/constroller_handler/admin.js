let db = require("../dao/config");
let bcryptjs = require("bcryptjs");     //密码加密
let jsonwebtoken = require("jsonwetoken");
let config = require("../config");

//管理员登录
exports.loginAdmin = (req,res)=>{
    //接收表单传递过来的数据
    let adminInfo = req.body;
    let sql = "select * from t_admin where admin_account=?";
    db.query(sql,adminInfo.admin_account,function (err,result) {
        if(err)
        {
            return res.message(err);    //sql语句执行失败
        }
        if(result.length !==1){
            return res.message("用户不存在登录失败");
        }
        // 拿着用户输入的密码和数据库中的密码进行比较
        let compareRes = bcryptjs.compareSync(adminInfo.admin_password,result[0].admin_password)
        // console.log(compareRes)
        if(!compareRes) return res.ss("密码错误，登录失败！")

        // 登录成功了
        let user = {...result[0],admin_password:"",user_intro:""}
        let tokenStr = jsonwebtoken.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        res.send({
            status:0,
            massage:"登录成功！",
            token:"Bearer "+tokenStr
        })
    })



}















