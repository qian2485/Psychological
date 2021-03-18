let joi = require("@hapi/joi");     //导入校验模块


let mes_id = joi.number().integer().min(1).required();
let mes_author = joi.string().required();
let mes_content = joi.string().required().allow('');

//获取留言板数据校验
exports.get_message_schema = {
    query:{
        
    }
}

//根据id获取留言板具体内容校验
exports.get_message_by_id_schema = {
    query:{
        mes_id
    }
}

//增加留言板数据校验
exports.add_message_schema = {
    body:{
        mes_author,
        mes_content
    }
}

//更新留言板数据校验
exports.update_message_schema = {
    body:{
        mes_id,
        mes_author,
        mes_content
    }
}

//删除留言板数据校验
exports.delete_message_schema = {
    query:{
        mes_id
    }
}