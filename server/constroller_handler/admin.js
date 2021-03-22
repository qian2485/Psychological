let db = require("../dao/config");
let bcryptjs = require("bcryptjs");     //密码加密
let jsonwebtoken = require("jsonwebtoken");
let config = require("../config");

//管理员注册
exports.regAdmin = (req,res)=>{
    //获取客户端提交的用户信息
    let adminInfo = req.body;
    //判断用户名和密码是否为空
    if(!adminInfo.account || !adminInfo.password){
        return res.message("用户名或者密码不能为空");
    }
    //检测用户名是否占用 ? 占位符
    let sql = 'select * from t_admin where account=?';
    db.query(sql,adminInfo.account,function(err,result) {
        if(err) return res.message(err);
        if(result.length>0) {
            //用户名被占用
            return res.message("用户名被占用，请更换其他用户名！");
        }

        //对用户密码进行加密 hashSync加盐算法 10随机盐的长度
        adminInfo.password = bcryptjs.hashSync(adminInfo.password,10);

        //插入数据
        let sqlStr = "insert into t_admin set ?";
        db.query(sqlStr,{account:adminInfo.account,password:adminInfo.password},function(err,result){
            if(err){  // 执行命令失败了
                return res.message(err)
            }
            if(result.affectedRows !== 1){   // 执行完命令后，影响的行数不是1
                // 注册用户失败
                return res.message("注册用户失败，请稍后再试...")
            }
            res.message("注册用户成功",0);
        })
    })
}

//管理员登录
exports.loginAdmin = (req,res)=>{
    //接收表单传递过来的数据
    let adminInfo = req.body;
    let sql = "select * from t_admin where account=?";
    db.query(sql,adminInfo.account,function (err,result) {
        if(err)
        {
            return res.message(err);    //sql语句执行失败
        }
        if(result.length !==1){
            return res.message("用户不存在登录失败");
        }
        // if(result[0].password == '123456')
        // {
        //     res.send({
        //         status:0,
        //         message:"登录成功！"
        //     })
        // }
        // 拿着用户输入的密码和数据库中的密码进行比较
        let compareRes = bcryptjs.compareSync(adminInfo.password,result[0].password)
        // console.log(compareRes)
        if(!compareRes) return res.ss("密码错误，登录失败！")

        // 登录成功了
        let admin = {...result[0],password:"",avatar:""};
        
        ////创建token   jwt.sign方法第一个参数可以存储信息 ,第二个参数存储token密钥 第三个是token过期时间
        let tokenStr = jsonwebtoken.sign(admin,config.jwtSecretKey,{expiresIn:config.expiresIn})
        res.send({
            status:0,
            massage:"登录成功！",
            token:"Bearer "+tokenStr
        })
    })



}
















