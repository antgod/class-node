/**
 *
 */
var fs = require('fs');
var domain = require('domain');
var d = domain.create();
var fd;
/**
 * bind 需要抛要抛出异常，intercept不需要
 */
fs.open('./test.txt','r', d.intercept(function(err,fd){
 /*   if(err)
     throw err;
    else*/
    console.log(fd);
}));
d.on('error',function(err){
    if(fd){
        fs.close(fd);
    }else{
        console.log('错了就错了');
    }
});