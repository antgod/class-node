/**
 * Created by lihongji on 2015/7/5.
 */

//内部方法调用了外部方法的局部变量，这个内部函数就叫做闭包
var func=function(){
    var count=0;           //上传时候，失败时候需要记录上传的字节

    return function(){
        console.log(count);
        count++;
        if(count==3){
            console.log('被调用了3次');
        }else if(count>=100){   //内存释放
            count=null;
        }
    }
}

var fn=func();
fn();
fn();
fn();
fn();