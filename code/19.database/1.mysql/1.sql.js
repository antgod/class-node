var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'123.57.143.189',
    port:3306,
    user:'root',
    password:'zfpx2015',
    database:'db201504'
});

var username = 'zfpx\' or 1=\'1';
//var username = 'zfpx\';drop table user;';
var password = '1234567';
var sql = "select * from user where username='"+username+"' and password='"+password+"'";//sql语句
console.log(sql);
connection.query(sql,function(err,rows,fields){
    if(err)
      throw err;
    connection.connect();
    console.log(rows);
    //console.log(fields);
    connection.destroy();
});
connection.connect();
connection.query(sql,function(err,rows,fields){
    if(err)
        throw err;
    console.log(rows);
    //console.log(fields);
    connection.destroy();
});
