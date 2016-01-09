var async = require('async');
/**
 * 串行执行
 *
 */
async.series({
    watchTv:function(callback){
        console.log(123);
        callback(null,'tv is over');
    },
    writeHomework:function(callback){
        callback(null,'homework is down');
    }
},function(err,results){
    console.log(results);
});