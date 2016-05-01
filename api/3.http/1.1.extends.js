'use strict';

let http=require('http');

let server=http.createServer((req,res)=>{
    if(req.url=='/favicon.ico'){
        return;
    }
    //console.log(http.METHODS,http.STATUS_CODES);
    res.end('hello');
});

server.listen(5000);

server.on('request',(req,res)=>{
    if(req.url=='/favicon.ico'){
        return;
    }
    console.log('IncomingMessage',req);
    console.log('ServerResponse',res);
});
                                ‰
server.on('connection',(Socket)=>{
    console.log('Socket',Socket);
});



