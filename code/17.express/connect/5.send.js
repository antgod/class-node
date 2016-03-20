/**
 * Created by lihongji on 2015/7/12.
 */

/**
 * 中间件
 *
 */
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
//设置静态文件所在的根目录
/**
 * 字符串 text/html
 * 对象 application/json
 * 数字
 */
app.use(express.static(path.join(__dirname,'/')));

app.use('/',function(req,res,next){
    console.log(1);
    next();
    console.log(4);
});
app.use('/',function(req,res,next){
    console.log(2);
    fs.createReadStream("./file.json").pipe(res);
    console.log(3);
});
app.listen(8080);