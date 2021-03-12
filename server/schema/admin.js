let joi = require("@hapi/joi");     //导入定义校验规则模块
let account = joi.string().min(2).max(10).required();
let password = joi.string().required();
let avatar = joi.string().dataUri().required();

//注册登录用户对象
exports.reg_admin_schema = {
    body:{
        account,
        password
    }
}

//登录校验对象
exports.login_admin_schema = {
    body:{
        account,
        password
    }
}


//修改密码校验对象
exports.update_password_schema = {
    body:{
        //老密码和新密码不一样
        oldPwd:password,
        newPwd:joi.not(joi.ref("oldPwd")).concat(password)
    }
}

//更新头像
exports.update_avatar_schema = {
    body:{
        avatar
    }
}