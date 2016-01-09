var http = require('http');
var username = 'admin';
http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    var formdata ;
    req.on('data',function(data){
        formdata = data.toString();
    });
    req.on('end',function(){
        var flag = true;
        if(formdata && formdata.length>0){
            var formObj = JSON.parse(formdata);
            if(formObj.username == username){
                flag =  false;
            }
            res.end(JSON.stringify({isUnique:flag}));
        }else{
            res.end(JSON.stringify({isUnique:false}));
        }

    });
}).listen(8080);