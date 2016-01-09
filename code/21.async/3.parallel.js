var async = require('async');
console.time('start');
/**
 * 并行执行多个函数，每个函数立刻执行，不依赖其它函数执行
 *
 */
async.parallelLimit([function(callback){
   setTimeout(function(){
       callback(null,'one');
   },2000)
},function(callback){
    setTimeout(function(){
        callback(null,'two');
    },2000)
},function(callback){
    setTimeout(function(){
        callback(null,'three');
    },1000)
},function(callback){
    setTimeout(function(){
        callback(null,'four');
    },500)
}],4,function(err,results){
    console.log(results);
    console.timeEnd('start');
});