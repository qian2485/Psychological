let joi = require("@hapi/joi");     //导入校验模块

let user_id = joi.number().required();
let user_nickname = joi.string().required();
let user_instro = joi.string().required();
let user_sex = joi.string().required();
let user_spe = joi.string().required();
let user_phone = joi.number().required();
let user_avatar = joi.string().dataUri().required();

//获取专家数据校验
exports.get_user_schema = {
    query:{
        
    }
}

//根据id获取专家详细信息校验
exports.get_user_by_id_schema = {
    query:{
        user_id
    }
}

//添加专家信息数据校验
exports.add_user_schema = {
    body:{
        user_nickname,
        user_instro,
        user_sex,
        user_spe,
        user_phone,
        user_avatar
    }
}

//更新专家信息数据校验
exports.update_user_schema = {
    body:{
        user_nickname,
        user_instro,
        user_sex,
        user_spe,
        user_phone,
        user_avatar,
        user_id
    }
}

//删除专家信息数据校验
exports.delete_user_schema = {
    query:{
        user_id
    }
}
