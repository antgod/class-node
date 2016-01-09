/**
 * restful
 * 表现层状态转换
 * 通过客户端请求改变服务器端资源的状态
 *
 * url 统一资源定位符
 * 状态转移
 *  请求的方式
 *  GET  请求一次资源
 *  POST 更新一个资源
 *  PUT 新建一个资源
 *  DELETE 删除一个资源
 **/


var http = require('http');
var url = require('url');
// http://localhost:8080/books
// http://localhost:8080/book/1
var server = http.createServer(function(req,res){
    switch (req.method){
        case 'POST':
            post(req,res);
            break;
        case 'PUT':
            put(req,res);
            break;
        case 'GET':
            get(req,res);
            break;
        case 'DELETE':
            del(req,res);
            break;
    }
}).listen(8080);

function post(req,res){
    res.end('post');
}
function get(req,res){
    res.end('get');
}
function del(req,res){
    res.end('delete');
}
function put(req,res){
    res.end('put');
}