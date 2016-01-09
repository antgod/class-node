var fs = require('fs');
/*fs.writeFile('./test.js',new Buffer('珠峰'),{flag:'a'},function(err){
    console.log('write over');
});*/
fs.writeFile('./test.js',new Buffer('珠峰'),{encoding:'utf8'},function(err){
    console.log('write over');
});