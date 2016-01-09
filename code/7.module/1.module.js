/**
 * Created by lihongji on 2015/6/28.
 */
//只执行一次，会缓存
var home1=require("./home.js");
var home2=require("./home.js");
console.log(home1);
var home3=require("home"); //只能访问home下面的index
console.log(home3.add(1,2));
//原生模块优先自己写的模块

console.log(module.paths);

console.log(require.resolve("home"));

var s=require.resolve("home");

console.log(require.cache[s]);

//console.log(require)
//逐级上找
/* 'd:\\zf\\second_day\\code\\module\\node_modules',
'd:\\zf\\second_day\\code\\node_modules',
    'd:\\zf\\second_day\\node_modules',
    'd:\\zf\\node_modules',
    'd:\\node_modules' ]
*/
