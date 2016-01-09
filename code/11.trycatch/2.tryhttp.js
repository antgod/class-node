var http = require('http');

//try{
    http.createServer(function(req,res){
        fs.open('a',function(fda){
            fs.openSync('notExists');
            fs.close(fda);
        });
        error();
    }).listen(8080);
//}catch(ex){
//    console.log(ex.message);
//}
/**
 * 1.不知道 哪报出来的
 * 2.客户端永远得不到响应
 * 3.有可能起资源泄露和内存泄露
 */
process.on('uncaughtException',function(err){
    console.log(err);
});
