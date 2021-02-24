let db = require("../dao/index")
let bcryptjs = require("bcryptjs");
let jsonwebtoken = require("jsonwebtoken");
let config = require("../config");

exports.regUser = (req,res)=>{
    // 获取客户端提交的用户信息
    let userInfo = req.body;
    // 判断用户名和密码是否为空
    if(!userInfo.username || !userInfo.password){
        return res.ss("用户名或密码不能为空")
    }

    // 检测用户名是否被占用  ?是占位符
    const  sql = 'SELECT * FROM user where username=?';
    db.query(sql,userInfo.username,function (err, result) {
        if(err){
            return res.ss(err)
        }
        if(result.length>0){
            // 用户名已经被占用了
            return res.ss("用户名被占用，请更换其它用户名！")
        }

        // 对用户的密码进行加密  hashSync加盐算法  10随机盐的长度
        userInfo.password = bcryptjs.hashSync(userInfo.password,10);
        // console.log(userInfo.password)

        // 插入数据
        const sqlStr = "insert into user set ?"
        db.query(sqlStr,{username:userInfo.username,password:userInfo.password},function (err, result) {
            if(err){  // 执行命令失败了
                return res.ss(err)
            }
            if(result.affectedRows !== 1){   // 执行完命令后，影响的行数不是1
                // 注册用户失败
                return res.ss("注册用户失败，请稍后再试...")
            }
            res.ss("注册用户成功",0);
        });
    });
}
exports.login = (req,res)=>{
    // 接收表单传递的数据
    let userinfo = req.body;
    const  sql = 'SELECT * FROM user where username=?';
    db.query(sql,userinfo.username,function (err, result) {
        if(err){
            return res.ss(err);  // sql语句执行失败
        }
        if(result.length !== 1){  // result代表用户信息 是一个数组
            // 用户名已经被占用了
            return res.ss("用户名不存在，登录失败")
        }
        // 拿着用户输入的密码和数据库中的密码进行比较
        let compareRes = bcryptjs.compareSync(userinfo.password,result[0].password)
        // console.log(compareRes)
        if(!compareRes) return res.ss("密码错误，登录失败！")

        // 登录成功了
        let user = {...result[0],password:"",user_intro:""}
        let tokenStr = jsonwebtoken.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        res.send({
            status:0,
            massage:"登录成功！",
            token:"Bearer "+tokenStr
        })
    });
}








