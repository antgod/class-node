/**
 * Created by lihongji on 2015/12/5.
 */

var get = function(url){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(Math.random());
        },1000);
        //reject(xhr);
    });
    return promise;
};


get(Math.random()).then(function(data){
    console.log("第一次"+data);
    return get(1)
}).then(function(data){
    console.log("第二次"+data);
});