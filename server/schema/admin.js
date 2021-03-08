let joi = require("@hapi/joi");     //导入定义校验规则模块
let admin_account = joi.string().min(2).max(10).required();
let admin_password = joi.string().required();
let admin_avatar = joi.string().dataUri().required();

//登录校验对象
exports.login_admin_schema = {
    body:{
        admin_account,
        admin_password
    }
}


//修改密码校验对象
exports.update_password_schema = {
    body:{
        //老密码和新密码不一样
        oldPwd:admin_password,
        newPwd:joi.not(joi.ref("oldPwd")).concat(admin_password)
    }
}

//更新头像
exports.update_avatar_schema = {
    body:{
        admin_avatar
    }
}