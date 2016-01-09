/**
 * run bind intercept监听的时候，将domain对象推入domain
 * 内部维护的一个stack中
 */
var domain = require('domain');
/*
var d1 = domain.create();
d1.name = 'xiaodidi';
var d2 = domain.create();
d2.name = 'dajiejie';
console.log(domain._stack);

d1.run(function(){
    console.log('d1 对象',domain._stack);
});
//运行另一个(同级)domain对象之后，前一个 domain被弹出，后一个domain被推入
d2.run(function(){
    console.log('d2 对象',domain._stack);
});
*/

var d =domain.create();
d.on('error',function(err){
    console.log('domain捕获到错误',err.message);
});
d.name = 'zfpx';
//console.log(domain._stack);

d.run(function(){
    //console.log(domain._stack);
    d.exit();
    //console.log(domain._stack);
    d.enter();
    //console.log(domain._stack);
    throw new Error('error');
});