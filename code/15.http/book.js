exports.add = function(req,res,args){
    res.end('add book '+args[0]+' '+args[1]+' successfully');
},
    exports.delete = function(req,res,args){
        res.end('delete book '+args[0]+' successfully');
    }