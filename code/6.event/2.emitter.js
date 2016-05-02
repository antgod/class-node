/**
 * Created by lihongji on 2015/6/28.
 */
var EventEmitter=require("events").EventEmitter;

var util=require("util");

function Person(name){
    this.name=name;
}

util.inherits(Person,EventEmitter);

var me =new Person('lhj');

me.on("toSchool",function(n){
    if(n<=6){
        console.log("我没到上学年龄");
    }else if(n>6&&n<=13){
        console.log("我上学了，上小学"+(n-6)+"年级");
    }else if(n>13&&n<=18){
        console.log("我中学了，上中学"+(n-13)+"年级");
    }else if(n>23){
        console.log("我已经过了上学年龄");
        me.removeAllListeners("toSchool");
    }
});

me.once("toUniversity",function(n){
    console.log("我上大学了，上大学"+(n-19)+"年级");
});

me.on("toWork",function(n){
    console.log("我上学了，上小学"+n+"年级");
});

me.emit("toSchool",3);
me.emit("toSchool",7);
me.emit("toSchool",14);
me.emit("toUniversity",22);
me.emit("toUniversity",23);
//console.log(me.listeners('toSchool'));
//console.log(EventEmitter.listenerCount(me,'toSchool'));
me.emit("toSchool",25);
me.emit("toSchool",28);



/*
    addListener                     增加监听
    on                              增加监听
    once                            只增加一次
    removeListener                  移除监听
    removeAllListeners(event)       移除所有监听
    emit                            触发监听
    linteners                       查看有多少监听
 */

