let joi = require("@hapi/joi");     //导入校验模块

let test_id = joi.number().required();
let test_name = joi.string().required();
let test_result = joi.string().required();
let test_advise = joi.string().required();

//获取心理测试数据校验
exports.get_test_schema = {
    query:{
        
    }
}

//根据id获取心理测试具体内容校验
exports.get_test_by_id_schema = {
    query:{
        test_id
    }
}

//添加心理测试数据校验
exports.add_test_schema = {
    body:{
        test_name,
        test_result
    }
}

//更新心理测试数据校验
exports.update_test_schema = {
    body:{
        test_name,
        test_result,
        test_advise,
        test_id
    }
}

//删除心理测试数据校验
exports.delete_test_schema = {
    query:{
        test_id
    }
}
