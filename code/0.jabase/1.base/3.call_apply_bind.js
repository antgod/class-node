/**
 * Created by lihongji on 2015/7/5.
 */

name='zhufengpeixun';
var obj={name:"zfpx"};
var func=function(){
    console.log(this.name);
};

//func.call();
//func.call(obj);
//func.apply(obj);

//指定作用域，不立即调用
var fn=func.bind(obj,'test');
fn();