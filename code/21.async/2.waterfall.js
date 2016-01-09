var async = require('async');
/**
 * waterfall(tasks,callback)
 * 都是依次执行一组函数
 *不同之外是waterfall将每个函数的返回值传递给下一个函数
 * 2. serires可是数组，也可是对象，但wterfall必须 是数组
 **/
async.waterfall([
    function(done){
        done(null,'加水');
    },
    function(data,done){
        done('咖啡不够了',data+'加咖啡');
    },function(data,done){
        done(null,data+'加糖');
    }
],function(err,results){
    console.log(err,results);
});
