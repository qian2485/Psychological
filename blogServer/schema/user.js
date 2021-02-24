let joi = require("@hapi/joi");  // 导入定义校验规则模块

// 定义用户名和密码的校验规则
// alphanum()   a~zA~Z0~9
// require()  必填
let username = joi.string().alphanum().min(2).max(10).required();
let password = joi.string().alphanum().min(2).max(10).required();

// 定义nickname和email的验证规则
let nickname = joi.string().required();
let email = joi.string().email().required();

// 验证头像的规则
// dataUri()  表示你的字符串必须满足如下格式：
// data:image/png;base64,iVBORw0KGgoAAAANS.....
let avatar = joi.string().dataUri().required();

// reg_login_schema 注册和登录表单校验规则对象
exports.reg_login_schema = {
    body:{  // 需要对req.body中的数据进行校验
        username,
        password
    }
}
exports.update_userinfo_schema = {
    body: {
        nickname,
        email
    }
}

// 校验修改密码的规则对象
exports.update_password_schema = {
    body:{
        // 老密码和新密码不能一样
        oldPwd:password,
        // newPwd:joi.ref("oldPwd")  表示新的密码必须和老的密码保持一致
        // newPwd:joi.ref("oldPwd")

        // 新的密码值和老的密码值不能一样
        // newPwd:joi.not(joi.ref("oldPwd"))

        // joi.concat(password)
        newPwd:joi.not(joi.ref("oldPwd")).concat(password)
    }
}

exports.update_avatar_schema = {
    body:{
        avatar
    }
}





