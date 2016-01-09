/**
 *接收客户端的post请求
 **/
/**
 * express
 * 模板解析 静态文件服务 中间件 路由
 * 还可以很方便的跟第三插件进行集成
 * npm install express
 */
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer());
//监听 路径 为/的 get请求
app.get('/', function (req, res) {
    fs.createReadStream('./form.html').pipe(res);
});
app.post('/post', function (req, res) {
    console.dir(req.files);
    res.send(req.body);
});
app.get('*', function (req, res) {
    res.send('404');
});
app.listen(8080);