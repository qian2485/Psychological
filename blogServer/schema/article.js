let joi = require("@hapi/joi");  // 导入定义校验规则模块

let title = joi.string().required();
let content = joi.string().required().allow('');
let state = joi.string().valid('已发布','未发布').required();
let cate_id = joi.number().integer().min(1).required();

exports.add_article_schema = {
    body:{
        title,
        content,
        state,
        cate_id
    }
}
