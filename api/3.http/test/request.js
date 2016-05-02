var http=require('http');


var options={
    hostname: 'localhost',
    port: 5000,
};

//http.get(options,(res)=>{         //使用get不用end
//    console.log('返回');
//});

//var req=http.request(options,(res)=>{      //使用request需要end
//    console.log('返回');
//});


var client=http.createClient('5000','localhost');

var req=client.request('POST','/');

req.on('data',(ret)=>{
    console.log('data',ret);
});

req.on('end',()=>{
    console.log('end');
});

req.end();

