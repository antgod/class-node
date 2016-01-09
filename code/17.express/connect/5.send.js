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
    //res.send('<h1>你好</h1>');
    ///res.send({name:"zfpx",age:8}+'<h1>你好</h1>');
    // res.send("{name:zfpx}");
    res.send(null);
});
app.listen(8080);