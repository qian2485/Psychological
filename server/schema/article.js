let joi = require("@hapi/joi");     //导入校验模块

let art_title = joi.string().required();
let art_content = joi.string().required().allow('');
let art_auth_name = joi.string().required();
let art_id = joi.number().integer().min(1).required();

//获取文章数据校验
exports.get_article_schema = {
    query:{
        id
    }
}

//增加文章数据校验
exports.add_article_schema = {
    body:{
        art_title,
        art_content,
        art_auth_name
    }
}

//更新文章数据校验
exports.update_article_schema = {
    body:{
        art_id,
        art_title,
        art_content,
        art_auth_name
    }
}

//删除文章数据校验
exports.delete_article_schema = {
    query:{
        art_id
    }
}