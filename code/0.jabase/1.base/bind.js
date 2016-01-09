/**
 * Created by lihongji on 2015/7/5.
 */

Function.prototype.bind = function(context,a){
    var SLICE = Array.prototype.slice;
    if(typeof this == 'function'){
        var args = SLICE.call(arguments, 1);
        var fn = this;
        return function(){
            var _args = SLICE.call(arguments, 0);
            fn.apply(context, args.concat(_args));
        }
    }else{
        console.warn('arguments is not a function');
    }
};

name='zhufengpeixun';
var obj={name:"lhj"};
var func=function(){
    console.log(this.name+":"+arguments[0]+":"+arguments[1]);
};

var fn=func.bind(obj,'test1');
fn('test2');


