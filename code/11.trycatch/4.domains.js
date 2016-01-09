/**
 *
 **/

var domain = require('domain');
var fs = require('fs');
var d = domain.create();
d.on('error',function(err){
    console.log(err);
});
d.run(function(){
    setTimeout(function(){
        test();
    },1000);
});

var d2 = domain.create();
d2.name = '美庭姐';
d2.on('error',function(err){
    console.log("%s发现了错误:%s",d2.name,err.message);
});
d2.run(function(){
    setTimeout(function(){
        fs.open('notExists','r',function(err,fd){
            if(err)
             throw new Error('老师偷懒');
            console.log(fd);
        });
    },1000);
});