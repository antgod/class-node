var name = 'zfpx';
console.log(name);
var age = 'age';
console.log(age);

/**
 * 全局对象 global->window
 * 在程序的任何地方都可以访问
 *
 **/

//console.log(global);

//log 标准输出输出流
console.log('hello');

console.log('%s','zfpx');//字符串
console.log('%j',{name:'zfpx'});//对象转JSOn描述字符串
console.log('%d',99.99);
console.log('%s',99.99);
console.log('%d','99.99');

console.log("1+1");
console.log(1+2);
var a =2,b ='2';
console.log(a+b);
console.log(a==b);
//node 1.console.js > result.log 2>&1
console.warn('warn');
console.error('error');

console.log(' %s %d','zfpx',6);

console.log(JSON.stringify({name:'zfpx'}));

console.dir({name:'zfpx'});
//console.trace();

//console.assert(2==1);



