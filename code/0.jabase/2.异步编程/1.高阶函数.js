/**
 * Created by lihongji on 2015/7/5.
 */
var func=function(){

};

var arrFunc=funciton(){

}

//高阶函数：函数作为参数传入
Array.prototype.forEach=function(fn){
    var arr=this;
    var length=this.leng;
    for(var i=0;i<length;i++){
        fn(arr[i],i,arr);
    }
};
