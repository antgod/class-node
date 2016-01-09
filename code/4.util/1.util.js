/**
 * Created by lihongji on 2015/6/28.
 */

var util=require("util");

function Parent(){

    this.name="father";
    this.age=6;
    this.say=function(){
        console.log('hello',this.name);
    }
}

Parent.prototype.showName=function(){
    console.log(this.name);
}


function Child(){
    Parent.call(this);
    this.name='child';
}

util.inherits(Child,Parent);

var p=new Parent();
p.showName();
p.say();

console.log(util.inspect(p,true));

var c=new Child();
c.showName();
c.say();

console.log(util.isArray([]));
console.log(util.isRegExp('/ddd/'));
console.log(util.isDate(new Date));
console.log(util.isError(new Error));