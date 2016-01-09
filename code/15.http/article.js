exports.add = function(req,res,args){
    res.end('add article '+args.join(' ')+' successfully');
},
exports.delete = function(req,res,args){
    res.end('delete article '+args.join(' ')+' successfully');
}
exports.batch={};
exports.batch.delete = function(req,res,args){
    res.end('delete article '+args.join(' ')+' successfully');
}