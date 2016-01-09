var fs = require('fs');

fs.watchFile('./1.md',{interval:1000},function(curr,prev){
    if(Date.parse(prev.ctime) == 0){
        console.log('新创建的');
    }else if(Date.parse(curr.ctime) ==0){
        console.log('被删除了');
    }else{
        console.log('修改');
        var s = fs.readFileSync('./1.md');
        console.log(s);
        fs.writeFile('./2.md',s,function(err){
            if(err)
                console.error(err);

        });
    }
});