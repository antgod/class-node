var http = require('http');
var url = require('url');
var fs = require('fs');
var connect = require('./2.connect');
var DATA = {
    "1":"<h1>这是第一篇</h1>",
    "2":"<h1>这是第二篇</h1>",
    "3":"<h1>这是第三篇</h1>",
    "4":"<h1>这是第四篇</h1>"
}
function getData(id){
    return DATA[id];
}
var app = connect();
//增加一个send 100 中央
app.use('/a',function(req,res){
    console.log('a1');
    return 2;
});
//村里
app.use('/a',function(req,res){
    console.log('a2');
});

app.use('/a',function(req,res){
    console.log('a3');
});
//农民
app.use('/b',function(req,res,next){
    console.log('b2');
});

http.createServer(app).listen(8080);