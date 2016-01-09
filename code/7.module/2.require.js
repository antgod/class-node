//require
//console.log((require.main == module));
if(require.main){
 //   console.log('这是主模块');
}
var s = require.resolve('./test');
require('./test')
require('./test')
delete require.cache[s];
require('./test')
require('./test')
console.log(module);
