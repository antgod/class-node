var path = require('path');
var mime = require('mime');
var fs = require('fs');
function serverStatic(options){
    options = options||{};
    options.root = path.resolve(options.root)+path.sep;
    function  sendFile(options,stat,req,res,next,file){
        var lastModified = new Date(req.headers['if-modified-since']);
        if(isNaN(lastModified.getTime())){
            return sendRawFile();
        }else if(stat.mtime.getTime() == lastModified.getTime()){
            return send304();
        }
        function sendRawFile(){
            res.setHeader('Cache-Control','max-age='+options.maxAge);
            res.setHeader('Expires',new Date(Date.now() +options.maxAge*1000).toGMTString());
            res.setHeader('Last-Modified',stat.mtime.toGMTString());
            res.setHeader('Set-Cookie',"Expires="+new Date(Date.now() +options.maxAge*1000).toGMTString());
            res.writeHead(200,{'Content-Type':mime.lookup(file)});
            fs.createReadStream(file).pipe(res);
        }
        function send304(){
            res.statusCode = 304;
            res.end('');
        }
    }

    return function(req,res,next){
        var file = req.url.slice(1);
        file = path.resolve(options.root,file);
        fs.stat(file,function(err,stat){
            if(stat.isDirectory()){
                res.end('this is a directory');
            }else{
                sendFile(options,stat,req,res,next,file);
            }
         })
    }
}




module.exports = serverStatic;