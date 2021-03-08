let joi = require("@hapi/joi");     //导入校验模块

let note_title = joi.string().required();
let note_content = joi.string().required().allow('');
let note_publisher = joi.string().required();
let note_id = joi.number().integer().min(1).required();
let is_state = joi.number().required();         //是否发布，发布为0，不发布为1
let note_createtime = joi.string().required();

//获取公告数据校验
exports.get_notice_schema = {
    query:{
        
    }
}

//根据id获取文章具体内容校验
exports.get_notice_by_id_schema = {
    query:{
        note_id
    }
}

//增加公告数据校验
exports.add_notice_schema = {
    body:{
        note_title,
        note_content,
        note_createtime,
        note_publisher,
        is_state
    }
}

//更新公告数据校验
exports.update_notice_schema = {
    body:{
        note_title,
        note_content,
        note_createtime,
        note_publisher,
        is_state,
        note_id
    }
}

//删除公告数据校验
exports.delete_notice_schema = {
    query:{
        note_id
    }
}

//发布公告
exports.publish_notice_schema = {
    body:{
        note_id,
        is_state
    }
}