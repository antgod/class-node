var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');
var path = require('path');
var formidable = require('formidable');
var server = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    req.method = urlObj.query.__method__;
    console.log(req.method);
    if(pathname =='/'){
        fs.createReadStream('./post.html').pipe(res);
    }else if(pathname =='/post'){
        var form = new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
             if(err){
                 res.writeHead(500);
                 res.end(err.toString());
             }
            else{
                 res.writeHead(200);
                 console.log(util.inspect(fields),util.inspect(files));
                 //fs.renameSync(files.avatar.path,path.resolve(process.argv[0],'..','demo.jpg'));
               fs.createReadStream(files.avatar.path).pipe(fs.createWriteStream('./demo.jpg'));
                res.end(JSON.stringify(files));
             }
        });
    }

}).listen(8080);