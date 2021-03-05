var mysql = require("mysql");
var db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'psy'
})

//导出db
module.exports = db;