var domain = require('domain');
var d1 =domain.create();
d1.name = 'd1';
d1.on('error',function(err){
    console.log('d1捕获到错误',err);
});
var d2 =domain.create();
d2.name = 'd2';
d2.on('error',function(err){
    console.log('d2捕获到错误',err);
});
console.log(domain._stack);


d1.run(function(){
    console.log(domain._stack);
    d2.run(function(){
        d1.exit();
        d2.dispose();
        d1.dispose();
        console.log(domain._stack);
    });
});