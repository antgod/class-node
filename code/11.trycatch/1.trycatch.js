/**
 * 错误处理
 *
 */
var fs = require('fs');
/*
try{
    fs.readFileSync('dd');
}catch(ex){
    console.log(ex.message);
}
console.log('over');*/

try{
    fs.readFile('dd',function(err,data){
        console.log(err,data);
    });
}catch(ex){
    console.log(ex.message);
}
console.log('over');
