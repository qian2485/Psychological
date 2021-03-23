let db = require("../dao/config");
let path = require("path");

//显示心理测试数据
exports.getTest = (req,res)=>{
    let sql = "select * from t_test where is_delete=0 order by test_id asc";
    db.query(sql,(err,result)=>{
        if(err) return res.message(err);
        res.send({
            status:0,
            message:"获取心理测试数据成功",
            data:result
        })
    })
}
//根据id获取心理测试文章
exports.getTestById = (req,res)=>{
    let sql = "select * from t_test where test_id=?";
    db.query(sql,req.query.test_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.length !== 1) return res.message("根据id获取心理测试数据失败！");
        res.send({
            status:0,
            message:"根据id获取心理测试信息成功",
            data:result[0]
        })
    })
}

//添加心理测试数据(只能用户添加)
exports.addTest = (req,res)=>{
    if(req.body.test_result <= 60){
        test_advise = "高危警告"
        // result[0].message("高危警告",1);
    } 
    else if(req.body.test_result <= 80)
    {
        test_advise = "心态良好"
        // result[0].message("心态良好",2);
    } 
    else if(req.body.test_result <= 100){
        test_advise = "心理优秀"
        // result[0].message("心理优秀",3);
    } 

     //准备入库的数据
     const testInfo = {
        ...req.body,
        test_advise
    }

    let sql = "insert into t_test set ?";
    db.query(sql,testInfo,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("添加心理测试失败");
        res.message("添加心理测试成功",0);
        

        // let sqlStr = "update t_test set test_result=? where test_id=?";
        // db.query(sqlStr,[result[0].test_result,result[0].test_id],(err1,result1)=>{
        //     if(result[0].test_result <= 60){
        //         result[0].test_advise = "高危警告"
        //         result[0].message("高危警告",1);
        //     } 
        //     else if(result[0].test_result <= 80)
        //     {
        //         result[0].test_advise = "心态良好"
        //         result[0].message("心态良好",2);
        //     } 
        //     else if(result[0].test_result <= 100){
        //         result[0].test_advise = "心理优秀"
        //         result[0].message("心理优秀",3);
        //     } 
        // })
        
    })
}

//编辑心理测试数据 根据id先进行查找
exports.updateTestById = (req,res)=>{
    let sql = "update t_test set test_name=?,test_result=?,test_advise=? where test_id = ?";
    db.query(sql,[req.body.test_name,req.body.test_result,req.body.test_advise,req.body.test_id],(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("修改心理测试失败");
        // if(result.test_result <= 60) result.message("高危警告",1);
        // else if(result.test_result <= 80) result.message("心态良好",2);
        // else if(result.test_result <= 100) result.message("心态良好",3);

        res.message("修改心理测试成功",0);
    })
}

//删除心理测试数据  根据id
exports.deleteTestById = (req,res)=>{
    let sql = "update t_test set is_delete=1 where test_id = ?";
    db.query(sql,req.query.test_id,(err,result)=>{
        if(err) return res.message(err);
        if(result.affectedRows !== 1) return res.message("删除心理测试失败");

        res.message("删除心理测试成功",0);
    })
}