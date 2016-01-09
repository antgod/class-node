var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'123.57.143.189',
    port:3306,
    user:'root',
    password:'zfpx2015',
    database:'db201504',
    queryFormat:function(query,values){
        if(!values)
            return query;
        return query.replace(/\:(\w+)/g,function(txt,key){
            console.log(txt,key);
            if(values.hasOwnProperty(key)){
                return values[key];
            }
            return txt;
        }.bind(this));
    }
});

connection.connect();
var username = "'zfpx'";
//var username = 'zfpx\';drop table user;';
var password = '123456';
var sql = "select * from user where username=:username and password=:password";//sql语句
console.log(sql);
connection.query(sql,{username:username,password:password},function(err,rows,fields){
    if(err)
      throw err;
    console.log(rows);
    //console.log(fields);
});
