var mysql      = require('mysql');
var db = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',  // 如果你是wampserver开启的mysql服务，那么密码就是空
    database : 'blog'
});
// 导出db
module.exports = db;








